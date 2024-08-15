const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { Telegraf, Scenes, session } = require("telegraf");
const { createCallBackBtn } = require("./utils");
const { importWalletScene, importWalletStep } = require("./scenes");

require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

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

  const importWalletButton = createCallBackBtn(
    "Import Wallet",
    "import-wallet"
  );

  const showWalletButton = createCallBackBtn("Show Wallet", "show-wallet");

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [[importWalletButton], [showWalletButton]],
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

bot.launch();

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const URI = `/webhook/${BOT_TOKEN}`;

const WEBHOOK_URL = "https://pinggy" + URI;

app.use(bodyParser.json());

// tokendetails();
// checkContributedBTS();
// getUserBTSData();

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
