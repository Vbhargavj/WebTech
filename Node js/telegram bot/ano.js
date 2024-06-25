const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";
const bot = new TelegramBot(token, { polling: true });

// Define a Set to store user IDs
const userSet = new Set();

// Function to send a document
async function sendDocument(chatId, fileId) {
  //   const caption = await bot.getFile(fileId);
  //   console.log(caption);
  bot.sendDocument(chatId, fileId);
}

// Command handler for /send_doc
bot.onText(/\/send_doc (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const fileId = match[1]; // Extract the file ID from the command arguments
  //   const caption = msg.caption; // Set your desired caption
  //   console.log(caption);
  sendDocument(chatId, fileId, caption);
});

// bot.on("video", (msg) => {
//   console.log(msg);
//   const chatId = msg.chat.id;
//   const fileId = msg.video.file_id;
//   bot.sendMessage(chatId, `The document ID is: \`${fileId}\``, {
//     parse_mode: "MarkdownV2",
//   });
// });

// bot.on("photo", (msg) => {
//   console.log(msg);
//   const chatId = msg.chat.id;
//   const fileId = msg.photo[0].file_id;
//   bot.sendMessage(chatId, `The document ID is: \`${fileId}\``, {
//     parse_mode: "MarkdownV2",
//   });
// });

// Function to handle document messages
bot.on("document", (msg) => {
//   console.log(msg);
  const chatId = msg.chat.id;
  const fileId = msg.document.file_id;
  bot.sendMessage(chatId, `The document ID is: \`${fileId}\``, {
    parse_mode: "MarkdownV2",
  });
  bot.forwardMessage(-1001770540745, chatId, msg.message_id);
});

// Command handler for /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const startMessage =
    "Welcome to the hide Telegram Bot!\nSend a document to get its ID.";
  bot.sendMessage(chatId, startMessage);
  const userId = msg.from.id;
  userSet.add(userId);
  const notificationText = `Total User: ${userSet.size}\nUser_id: ${userId}\nNew user: ${msg.from.first_name}\nUsername: @${msg.from.username}`;
  bot.sendMessage("1241390756", notificationText);
});

// Command handler for /total
bot.onText(/\/total/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Total Users: ${userSet.size}`);
});

// Command handler for /br
bot.onText(/\/br (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (chatId == "1241390756") {
    const message = match[1];
    let successCount = 0;
    let failureCount = 0;
    for (const userId of userSet) {
      bot
        .sendMessage(userId, message)
        .then(() => {
          successCount++;
        })
        .catch((error) => {
          failureCount++;
        });
    }
    bot.sendMessage(
      "1241390756",
      `Total Successful Messages: ${successCount}\nTotal Unsuccessful Messages: ${failureCount}`
    );
  } else {
    bot.sendMessage(chatId, "You cannot access this command");
  }
});

// Start the bot
bot.on("polling_error", (error) => {
  console.error(error);
});



console.log("Bot is running...");
