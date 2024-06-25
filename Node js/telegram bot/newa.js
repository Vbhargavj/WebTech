// const TelegramBot = require("node-telegram-bot-api");

// const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";
// const bot = new TelegramBot(token, { polling: true });
const userList = [];
const adminId = 1241390756;
const userInteraction = {};

// bot.on("polling_error", (error) => {
//   console.error(error);
// });

// bot.onText(/\/start/, async (msg) => {
//   const chatId = msg.chat.id.toString();
//   console.log(chatId);
//   console.log(userList);

//   // Modified: Initialize userInteraction for the chatId
//   await bot.sendMessage(
//     chatId,
//     `${msg.from.first_name} ✨ Welcome aboard, and enjoy your time here! ✨`
//   );
// });

// const broadcast = async () => {
//   userList.forEach((element) => {
//     bot.sendMessage(element, "msg");
//   });
// };

const TelegramBot = require("node-telegram-bot-api");

const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";
const bot = new TelegramBot(token, { polling: true });

// Dictionary to store user state
const userState = {};

bot.on("polling_error", (error) => {
  console.error(error);
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();
  // console.log(chatId);
  // console.log(userList);

  // Modified: Initialize userInteraction for the chatId
  await bot.sendMessage(
    chatId,
    `${msg.from.first_name} ✨ Welcome aboard, and enjoy your time here! ✨`
  );
});
// Listen for incoming messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  // Check if the message is the /addbirthday command
  if (message.startsWith("/addbirthday")) {
    initiateConversation(chatId);
  } else if (message === "/cancel") {
    cancelConversation(chatId);
  } else {
    // Check if user is in a conversation
    if (userState[chatId]) {
      handleConversation(chatId, message);
    }
  }
});

// Function to initiate conversation
function initiateConversation(chatId) {
  bot.sendMessage(chatId, "Hi there! What is your name?");
  userState[chatId] = { step: 1 };
}

// Function to handle conversation steps
function handleConversation(chatId, message) {
  switch (userState[chatId].step) {
    case 1:
      userState[chatId].name = message;
      bot.sendMessage(
        chatId,
        "Nice to meet you, " + message + "! How old are you?"
      );
      userState[chatId].step++;
      break;
    case 2:
      userState[chatId].age = message;
      // Ask for confirmation
      bot.sendMessage(
        chatId,
        `Great! So you are ${userState[chatId].name} and you are ${userState[chatId].age} years old. Is this correct? (yes/no)`
      );
      userState[chatId].step++;
      break;
    case 3:
      if (message.toLowerCase() === "yes") {
        bot.sendMessage(
          chatId,
          "Thank you for confirming! Conversation completed."
        );
      } else if (message.toLowerCase() === "no") {
        bot.sendMessage(chatId, "ok");
        delete userState[chatId];
      } else {
        bot.sendMessage(chatId, 'Please respond with either "yes" or "no".');
      }
      break;
    default:
      // Invalid step, reset user state
      delete userState[chatId];
      break;
  }
}

// Function to cancel conversation
function cancelConversation(chatId) {
  if (userState[chatId]) {
    bot.sendMessage(chatId, "Conversation cancelled.");
    delete userState[chatId];
  } else {
    bot.sendMessage(chatId, "There is no active conversation to cancel.");
  }
}
const broadcast = async () => {
  userList.forEach((element) => {
    bot.sendMessage(element, "msg");
  });
};

bot.on('message',(msg)=>{
  console.log(msg);
})