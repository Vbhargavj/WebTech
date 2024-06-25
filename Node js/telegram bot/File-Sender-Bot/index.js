const TelegramBot = require("node-telegram-bot-api");
const { connectToMongo } = require("./connect");
const UModel = require("./model/userModel");
const keyModel = require("./model/keyModel");

const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";

connectToMongo(
  "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
  console.log("I am connected");
});

const bot = new TelegramBot(token, { polling: true });

const userList = [];

const userState = {};

const fetchUsers = async () => {
  try {
    const users = await UModel.find();
    userList.push(...users.map((user) => user.userId));
    // console.log("Users fetched from MongoDB:", userList);
  } catch (error) {
    console.error("Error fetching users from MongoDB:", error);
  }
};

fetchUsers();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id.toString();
  const message = msg.text;
  const messageId = msg.message_id;

  // Check if there is an active conversation for this user
  if (userState[chatId]) {
    // Handle conversation
    handleConversation(chatId, message, messageId);
  } else {
    // console.log("No active conversation for user:", chatId);
  }
});

async function handleConversation(chatId, message, messageId) {
  const step = userState[chatId].step;
  const keys = userState[chatId].keys;

  switch (step) {
    case 1:
      // Check if the selected key is valid
      if (keys.includes(message)) {
        // Store the selected key in user state
        userState[chatId].selectedKey = message;
        // console.log(userState[chatId].selectedKey);

        userState[chatId].step++;
        bot.sendMessage(chatId, "Stored successfully");

        const keyModelInstance = await keyModel.findOne({
          keyId: keys,
          userId: chatId,
        });
        keyModelInstance.keyItems.push(messageId);
        await keyModelInstance.save();
        // Move to the next step
      } else {
        bot.sendMessage(
          chatId,
          "Invalid key. Please select a key from the keyboard."
        );
      }
      delete userState[chatId];
      break;

    default:
      // Invalid step, reset user state
      delete userState[chatId];
      break;
  }
}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();
  const startMessage =
    "Welcome to the hide Telegram Bot!\nSend a document to get its ID.";
  await bot.sendMessage(chatId, startMessage);
  const userId = msg.from.id;

  // console.log(userList);
  if (!userList.includes(chatId)) {
    userList.push(chatId);
    const newUser = new UModel({ userId: userId });
    await newUser.save();
    const notificationText = `Total User: ${userList.length}\nUser_id: ${userId}\nNew user: ${msg.from.first_name}\nUsername: @${msg.from.username}`;
    await bot.sendMessage("1241390756", notificationText);
  }
});

bot.on("photo", async (msg) => {
  const chatId = msg.chat.id.toString();
  const messageId = msg.message_id;
  await forwardMessage(chatId, messageId);
});

bot.on("document", async (msg) => {
  const chatId = msg.chat.id.toString();
  const messageId = msg.message_id;
  await forwardMessage(chatId, messageId);
});

bot.on("video", async (msg) => {
  const chatId = msg.chat.id.toString();
  const messageId = msg.message_id;
  await forwardMessage(chatId, messageId);
});

bot.on("audio", async (msg) => {
  const chatId = msg.chat.id.toString();
  const messageId = msg.message_id;
  await forwardMessage(chatId, messageId);
});

async function forwardMessage(chatId, messageId) {
  await bot.forwardMessage(-1001770540745, chatId, messageId);
  await bot.forwardMessage(chatId, chatId, messageId);

  const userModelInstance = await UModel.findOne({ userId: chatId });
  if (!userModelInstance || userModelInstance.keys.length <= 0) {
    await bot.sendMessage(chatId, "First make keys with /genkey");
    return;
  }
  const keys = userModelInstance.keys;
  initiateConversation(chatId, keys, messageId);
}

async function initiateConversation(chatId, keys, messageId) {
  userState[chatId] = { step: 1, keys, messageId };

  const keyboard = {
    keyboard: keys.map((key) => [key]), // Each key on a separate row
    resize_keyboard: true,
    one_time_keyboard: true,
  };

  await bot.sendMessage(chatId, "Please select a key to store the file:", {
    reply_markup: JSON.stringify(keyboard),
  });
}

bot.onText(/\/genkey (.+)/, async (msg, match) => {
  const chatId = msg.chat.id.toString();
  const key = match[1];
  const uniqueKey = chatId + key;

  const userModelInstance = await UModel.findOne({ userId: chatId });
  if (!userModelInstance) {
    await bot.sendMessage(chatId, "Error: User not found");
    return;
  }

  userModelInstance.keys.push(key);
  await userModelInstance.save();

  await keyModel.create({
    keyId: key,
    userId: chatId,
  });

  bot.sendMessage(chatId, "New key stored successfully.");
});

bot.onText(/\/getkey (.+)/, async (msg, match) => {
  const chatId = msg.chat.id.toString();
  const key = match[1];

  if (!key) {
    await bot.sendMessage(chatId, "Invalid command");
    return;
  }

  const keyModelInstance = await keyModel.findOne({ keyId: key });
  if (!keyModelInstance) {
    await bot.sendMessage(chatId, "Key not found");
    return;
  }

  await forwardKeyMessages(keyModelInstance, msg);
});

async function forwardKeyMessages(keyModelInstance, msg) {
  const keyItems = keyModelInstance.keyItems;
  const chatId = keyModelInstance.userId;

  for (let i = 0; i < keyItems.length; i++) {
    await bot.forwardMessage(msg.from.id, chatId, keyItems[i] - 2);
  }
}

bot.onText(/\/br (.+)/, async (msg,match) => {
  const msgs=match[1]
  userList.forEach((element) => {
    bot.sendMessage(element, msgs);
  });
});