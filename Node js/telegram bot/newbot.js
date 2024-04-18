const TelegramBot = require("node-telegram-bot-api");

const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";
const server = require("./server");
const Model = require("./userModel");

const bot = new TelegramBot(token, { polling: true });
const userList = [];
const adminId = 1241390756;
const userInteraction = {}; // Modified: Changed from array to object

// Fetch existing users from MongoDB when the bot starts
const fetchUsers = async () => {
  try {
    const users = await Model.find();
    userList.push(...users.map((user) => user.userId));
    console.log("Users fetched from MongoDB:", userList);
  } catch (error) {
    console.error("Error fetching users from MongoDB:", error);
  }
};

// Call fetchUsers function when the bot starts
bot.on("polling_error", (error) => {
  console.error(error);
});

fetchUsers();

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();
  console.log(chatId);
  console.log(userList);
  if (!userList.includes(chatId)) {
    userList.push(chatId);
    await bot.sendMessage(adminId, `New user: ${msg.from.first_name}`);

    try {
      await Model.create({ userId: chatId });
      console.log("New user added to MongoDB:", chatId);
    } catch (error) {
      console.error("Error adding new user to MongoDB:", error);
    }
  }
  // Modified: Initialize userInteraction for the chatId
  await bot.sendMessage(
    chatId,
    `${msg.from.first_name} ✨ Welcome aboard, and enjoy your time here! ✨`
  );
});

const broadcast = async () => {
  userList.forEach((element) => {
    bot.sendMessage(element, "msg");
  });
};

// setInterval(broadcast, 10000);
