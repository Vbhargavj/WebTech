const teleBot = require("node-telegram-bot-api");

const bot = new teleBot("5369531550:AAFdpCUzqBJxcG0th98XQGddqZc3vSRBwKI");
console.log("startig.....");
bot.on("message",async (message) => {
  console.log(message);
  const keyboard = {
    reply_markup: {
      keyboard: [["Press me!", "df"], ["vbj"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
  bot.sendMessage(message.chat.id, "you have sent" + message.text, keyboard);
  await sendAdmin(message.text)
});
sendAdmin=async(msg)=>{
  bot.sendMessage(1241390756, msg)
}
bot.startPolling();
