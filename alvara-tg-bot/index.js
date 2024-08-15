const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { Telegraf, Scenes, session } = require("telegraf");
const { createCallBackBtn } = require("./utils");
const { importWalletScene, importWalletStep } = require("./scenes");

require("dotenv").config();

const { tokendetails } = require("./controllers/tokens.controllers.js");
const {
  checkContributedBTS,
  getUserBTSData,
} = require("./controllers/user.controller.js");

const app = express();
const port = process.env.PORT || 3001;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);
const stage = new Scenes.Stage([importWalletStep]);

bot.use(session());
bot.use(stage.middleware());

bot.command("start", (ctx) => {
  const message = `Welcome to the XChain-BTS-Investment Bot!`;
  const importWalletButton = createCallBackBtn("Import Wallet", "import-wallet");
  const showWalletButton = createCallBackBtn("Show Wallet", "show-wallet");
  const checkBTSButton = createCallBackBtn("Check Contributed BTS", "check-contributed-bts");
  const getUserBTSButton = createCallBackBtn("Get User BTS Data", "get-user-bts-data");

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [
        [importWalletButton],
        [showWalletButton],
        [checkBTSButton],
        [getUserBTSButton]
      ],
    },
  });
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
      const contributedBTS = await checkContributedBTS(ctx.session.wallet.address);
      const message = `Your contributed BTS:\n${JSON.stringify(contributedBTS, null, 2)}`;
      ctx.reply(message);
    } catch (error) {
      ctx.reply("There was an error fetching your contributed BTS.");
    }
  } else {
    ctx.reply("You need to import your wallet first.");
  }
});

bot.action("get-user-bts-data", async (ctx) => {
  if (ctx.session.wallet) {
    try {
      const userBTSData = await getUserBTSData(1, 10, ctx.session.wallet.address);
      const message = `Your BTS data:\n${JSON.stringify(userBTSData, null, 2)}`;
      ctx.reply(message);
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

const setwebhook = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  // console.log(res.data);
};

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    bot.sendMessage(chatId, "Welcome to the bot!");
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
