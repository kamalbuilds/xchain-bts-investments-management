const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { Telegraf, Scenes, session } = require("telegraf");
const { createCallBackBtn, decrypt } = require("./utils");
const { importWalletScene, importWalletStep } = require("./scenes");
const { ethers } = require("ethers");
const { btsabi } = require("./abis/bts.js");

require("dotenv").config();

const {
  trendingtokendetails,
  loosingtokendetails,
} = require("./controllers/tokens.controllers.js");

const {
  checkContributedBTS,
  getUserBTSData,
} = require("./controllers/user.controller.js");

const app = express();
const port = process.env.PORT || 3001;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);
const stage = new Scenes.Stage([importWalletStep]);


const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_SEPOLIA)


bot.use(session());
bot.use(stage.middleware());

bot.command("start", (ctx) => {
  const message = `Welcome to the XChain-BTS-Investment Bot!`;
  const importWalletButton = createCallBackBtn(
    "Import Wallet",
    "import-wallet"
  );
  const showWalletButton = createCallBackBtn("Show Wallet", "show-wallet");
  const checkBTSButton = createCallBackBtn(
    "Check Contributed BTS",
    "check-contributed-bts"
  );
  const getUserBTSButton = createCallBackBtn(
    "Get User BTS Data",
    "get-user-bts-data"
  );
  const trendingTokens = createCallBackBtn(
    "Trending Tokens",
    "trending-tokens"
  );
  const loosingTokens = createCallBackBtn("Loosing Tokens", "loosing-tokens");

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [
        [importWalletButton],
        [showWalletButton],
        [checkBTSButton],
        [getUserBTSButton],
        [trendingTokens],
        [loosingTokens],
      ],
    },
  });
});

// @kamal example value - /contributetobts 0x88f443423ee7f81ac74db28489137bfff999ac70 100
bot.command("contributetobts", async (ctx) => {

  if(!ctx.session.wallet) { return ctx.reply("import wallet first")};
  
  console.log(ctx.session.wallet);

  const pvtkey = decrypt(ctx.session.wallet.privateKey);
  console.log("decr",pvtkey);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


  const chatId = ctx.chat.id;
  const messageText = ctx.message.text;
  const match = messageText.match(/\/contributetobts\s+(\w+)\s+(\d+(\.\d+)?)/); // @kamal use regex to match two parameters

  if (!match) {
      return ctx.reply("Please provide a valid BTS address and amount. Usage: /contributetobts <bts_address> <amount>");
  }

  const btsAddress = match[1]; // Extract the BTS address
  const amount = match[2]; // Extract the amount
  const amountToSend = ethers.utils.parseUnits(amount, 18); // Amount of tokens to deposit

  const Contract = new ethers.Contract(btsAddress, btsabi, wallet);
  try {
      const tx = await Contract.contribute( BigInt(10), { value : amountToSend ,gasLimit: 200000 });
      await tx.wait(); // Wait for the transaction to be mined
      ctx.reply(`Successfully contributed ${amount} tokens to the BTS at ${btsAddress}. Transaction hash: ${tx.hash}`);
  } catch (error) {
      ctx.reply(`Error: ${error.message}`);
  }
});

bot.action("import-wallet", (ctx) => {
  ctx.scene.enter(importWalletScene);
});

bot.action("show-wallet", (ctx) => {
  if (ctx.session.wallet) {
    ctx.reply(`Your wallet address is ${ctx.session.wallet.address}`);
  } else {
    ctx.reply("You have not imported any wallet yet.");
  }
});

bot.action("check-contributed-bts", async (ctx) => {

  if (ctx.session.wallet) {
    try {
      const contributedBTS = await checkContributedBTS(
        ctx.session.wallet.address
      );

      const formattedMessage = Object.values(contributedBTS)
        .map((bts) => {
          return `
          <b>Name:</b> ${bts.btsDetails.name}
          <b>URI:</b> <a href="${bts.btsDetails.uri}">${bts.btsDetails.uri}</a>
          <b>Address:</b> ${bts.btsDetails.address}
          <b>All-Time Performance:</b> ${bts.btsDetails.all_time_performance}%
          <b>TVL (USD):</b> $${bts.btsDetails.tvl[0].usd}
          <b>Details:</b> <a href="${bts.btsDetails.link}">View BTS</a>
        `;
        })
        .join("\n\n");

      ctx.replyWithHTML(
        `<b>Your contributed BTS 📜 :</b>\n\n${formattedMessage}`
      );
    } catch (error) {
      ctx.reply("There was an error fetching your contributed BTS.");
    }
  } else {
    ctx.reply("You need to import your wallet first.");
  }
});

bot.action("trending-tokens", async (ctx) => {
  const trendingTokens = await trendingtokendetails();
  const formattedMessage = Object.values(trendingTokens)
    .map((token) => {
      return `
      <b>Name:</b> ${token.name}
      <b>Symbol:</b> ${token.symbol}
    `;
    })
    .join("\n\n");

  ctx.replyWithHTML(`<b>The Trending Tokens are :</b>\n\n${formattedMessage}`);
});

bot.action("loosing-tokens", async (ctx) => {
  const trendingTokens = await loosingtokendetails();
  const formattedMessage = Object.values(trendingTokens)
    .map((token) => {
      return `
      <b>Name:</b> ${token.name}
      <b>Symbol:</b> ${token.symbol}
    `;
    })
    .join("\n\n");

  ctx.replyWithHTML(
    `<b>The Loosing 24hr Tokens are :</b>\n\n${formattedMessage}`
  );
});

bot.action("get-user-bts-data", async (ctx) => {
  if (ctx.session.wallet) {
    try {
      const userBTSData = await getUserBTSData(
        1,
        10,
        ctx.session.wallet.address
      );

      const formattedMessage = Object.values(userBTSData)
        .map((bts) => {
          return `
          <b>Name:</b> ${bts.btsDetails.name}
          <b>URI:</b> <a href="${bts.btsDetails.uri}">${bts.btsDetails.uri}</a>
          <b>Address:</b> ${bts.btsDetails.address}
          <b>All-Time Performance:</b> ${bts.btsDetails.all_time_performance}%
          <b>TVL (USD):</b> $${bts.btsDetails.tvl[0].usd}
          <b>Details:</b> <a href="${bts.btsDetails.link}">View BTS</a>
        `;
        })
        .join("\n\n");

      ctx.replyWithHTML(
        `<b>The BTS you have created :</b>\n\n${formattedMessage}`
      );
    } catch (error) {
      ctx.reply("There was an error fetching your BTS data.");
    }
  } else {
    ctx.reply("You need to import your wallet first.");
  }
});

bot.launch();

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = "https://pinggy" + URI;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello kamal");
});

const setwebhook = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  // console.log(res.data);
};

// if user inputs /trendingtoken show him trending tokens

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    bot.sendMessage(chatId, "Welcome to the bot!");
  } else if (messageText === "/trendingtoken") {
    bot.sendMessage(chatId, "Trending tokens are: ");
  }
});

app.post(URI, async (req, res) => {
  console.log(req.body);
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: `You said: ${text}`,
  });

  return res.send();
});

app.listen(port, async () => {
  console.log(`Telegram bot listening on port ${port}`);
  // await setwebhook(); // Set the webhook
});
