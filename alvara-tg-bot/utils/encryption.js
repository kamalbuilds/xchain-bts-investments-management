const crypto = require("crypto-js");

function encrypt(text) {
  return crypto.AES.encrypt(text, process.env.TELEGRAM_BOT_TOKEN).toString();
}

function decrypt(cipherText) {
  const bytes = crypto.AES.decrypt(cipherText, process.env.TELEGRAM_BOT_TOKEN);
  return bytes.toString(crypto.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};