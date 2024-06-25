// const TelegramBot = require("node-telegram-bot-api");
// const UModel = require("../model/userModel");
// const keyModel = require("../model/keyModel");
// const userList = [];
// const userState = {};

// const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";

// const bot = new TelegramBot(token, { polling: true });

// exports.doc = async (msg) => {
//   const chatId = msg.chat.id.toString();
//   const messageId = msg.message_id;
//   await forwardMessages(chatId, messageId);
// };

// exports.fetchUsers = async () => {
//   try {
//     const users = await UModel.find();
//     userList.push(...users.map((user) => user.userId));
//     // console.log("Users fetched from MongoDB:", userList);
//   } catch (error) {
//     console.error("Error fetching users from MongoDB:", error);
//   }
// };

// exports.messageHandler = async (msg) => {
//   const chatId = msg.chat.id.toString();
//   const message = msg.text;
//   const messageId = msg.message_id;

//   // Check if there is an active conversation for this user
//   if (userState[chatId]) {
//     // Handle conversation
//     handleConversation(chatId, message, messageId);
//   }
// };

// const handleConversation = async (chatId, message, messageId) => {
//   const step = userState[chatId].step;
//   const keys = userState[chatId].keys;

//   switch (step) {
//     case 1:
//       // Check if the selected key is valid
//       if (keys.includes(message)) {
//         // Store the selected key in user state
//         userState[chatId].selectedKey = message;
//         // console.log(userState[chatId].selectedKey);

//         userState[chatId].step++;
//         bot.sendMessage(chatId, "Stored successfully");

//         const keyModelInstance = await keyModel.findOne({
//           keyId: keys,
//           userId: chatId,
//         });
//         keyModelInstance.keyItems.push(messageId);
//         await keyModelInstance.save();
//         // Move to the next step
//       } else {
//         bot.sendMessage(
//           chatId,
//           "Invalid key. Please select a key from the keyboard."
//         );
//       }
//       delete userState[chatId];
//       break;

//     default:
//       // Invalid step, reset user state
//       delete userState[chatId];
//       break;
//   }
// };

// exports.onStart = async (msg) => {
//   const chatId = msg.chat.id.toString();
//   const startMessage =
//     "Welcome to the hide Telegram Bot!\nSend a document to get its ID.";
//   await bot.sendMessage(chatId, startMessage);
//   const userId = msg.from.id;

//   // console.log(userList);
//   if (!userList.includes(chatId)) {
//     userList.push(chatId);
//     const newUser = new UModel({ userId: userId });
//     await newUser.save();
//     const notificationText = `Total User: ${userList.length}\nUser_id: ${userId}\nNew user: ${msg.from.first_name}\nUsername: @${msg.from.username}`;
//     await bot.sendMessage("1241390756", notificationText);
//   }
// };

// const forwardMessages = async (chatId, messageId) => {
//   try {
//     bot.forwardMessage(-1001770540745, chatId, messageId);
//     bot.forwardMessage(chatId, chatId, messageId);

//     const userModelInstance = await UModel.findOne({ userId: chatId });
//     if (!userModelInstance || userModelInstance.keys.length <= 0) {
//       bot.sendMessage(chatId, "First make keys with /genkey");
//       return;
//     }
//     const keys = userModelInstance.keys;
//     initiateConversation(chatId, keys, messageId);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const initiateConversation = (chatId, keys, messageId) => {
//   userState[chatId] = { step: 1, keys, messageId };

//   const keyboard = {
//     keyboard: keys.map((key) => [key]), // Each key on a separate row
//     resize_keyboard: true,
//     one_time_keyboard: true,
//   };

//   bot.sendMessage(chatId, "Please select a key to store the file:", {
//     reply_markup: JSON.stringify(keyboard),
//   });
// };

// exports.genKey = async (msg, match) => {
//   const chatId = msg.chat.id.toString();
//   const key = match[1];
//   const uniqueKey = chatId + key;

//   const userModelInstance = await UModel.findOne({ userId: chatId });
//   if (!userModelInstance) {
//     await bot.sendMessage(chatId, "Error: User not found");
//     return;
//   }

//   userModelInstance.keys.push(key);
//   await userModelInstance.save();

//   await keyModel.create({
//     keyId: key,
//     userId: chatId,
//   });

//   bot.sendMessage(chatId, "New key stored successfully.");
// };

// exports.getKey = async (msg, match) => {
//   const chatId = msg.chat.id.toString();
//   const key = match[1];

//   if (!key) {
//     await bot.sendMessage(chatId, "Invalid command");
//     return;
//   }

//   const keyModelInstance = await keyModel.findOne({ keyId: key });
//   if (!keyModelInstance) {
//     await bot.sendMessage(chatId, "Key not found");
//     return;
//   }

//   await forwardKeyMessages(keyModelInstance, msg);
// };

// const forwardKeyMessages = async (keyModelInstance, msg) => {
//   const keyItems = keyModelInstance.keyItems;
//   const chatId = keyModelInstance.userId;

//   for (let i = 0; i < keyItems.length; i++) {
//     bot.forwardMessage(msg.from.id, chatId, keyItems[i] - 2);
//   }
// };
