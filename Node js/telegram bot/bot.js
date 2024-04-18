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
  await bot.sendMessage(chatId, "Welcome! Select an option:", {
    reply_markup: {
      keyboard: branchKeyBoard,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(/^(IT|CS|EC|ICT)$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const branch = match[1].toUpperCase(); // Get the selected branch
  userInteraction[chatId] = { branch };
  // Store the selected branch in userInteraction

  await bot.sendMessage(chatId, "Select semester:", {
    reply_markup: {
      keyboard: semKeyBoard, // Show semester options based on the selected branch
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(/^SEM \d+$/, async (msg) => {
  const chatId = msg.chat.id;
  const semester = msg.text.toUpperCase(); // Get the selected semester
  const { branch } = userInteraction[chatId]; // Get the selected branch from userInteraction
  const subjects = ssemKeyBoard[branch][semester]; // Get subjects based on branch and semester

  if (subjects && subjects.length > 0) {
    const subjectList = subjects.join(", ");
    await bot.sendMessage(chatId, `Subjects for ${semester}: ${subjectList}`);
  } else {
    await bot.sendMessage(
      chatId,
      "No subjects available for the selected semester."
    );
  }
});

const onBackPress = () => {};

const branchKeyBoard = [["IT"], ["CS"], ["EC"], ["ICT"], ["Back"]];

const semKeyBoard = [["SEM 8"], ["SEM 7"]];
const ssemKeyBoard = {
  IT: {
    "SEM 8": ["BME", "Maths", "Eng"],
    "SEM 7": ["Physics", "BEE", "PS"],
  },
  CS: {
    "SEM 8": ["BMeE", "Maths", "Eng"],
    "SEM 7": ["Physics", "BEE", "PS"],
  },
  EC: {
    "SEM 8": ["BME", "Maths", "Eng"],
    "SEM 7": ["Physics", "BEE", "PS"],
  },
  ICT: {
    "SEM 8": ["BME", "Maths", "Eng"],
    "SEM 7": ["Physics", "BEE", "PS"],
  },
};

const fetchUser = () => {
  const result = Model.find();
  console.log(result);
};

const broadcast = async () => {
  userList.forEach((element) => {
    bot.sendMessage(element, "msg");
  });
};
setInterval(broadcast, 10000);

// setInterval(async ()=>{
//  if(userList){
//   for (const user of userList) {
//     await Model.create(user);
//   }

//  }
// },1000*60)

bot.on('message',async (msg)=>{
  console.log(msg)
  const chatId=msg.chat.id
  bot.forwardMessage(chatId,-1001834878605,177)
})
