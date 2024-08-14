const axios = require("axios");

const botToken = process.env.TELEGRAM_BOT_TOKEN;

function sendTelegramMessage(userId, message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const data = {
    chat_id: userId,
    text: message,
  };

  return axios
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => console.error("Error sending message:", error));
}

module.exports = sendTelegramMessage;
