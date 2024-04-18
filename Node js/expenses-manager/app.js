const TelegramBot = require("node-telegram-bot-api");
const morgan = require("morgan");
const User = require("./model/userModel");
const token = "7097211619:AAGCHJCVg2sJvQIpUC0bMakORM6_SEI7I40";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, "this is starting ....");
});

bot.on("new_chat_members", async (msg) => {
    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;
  
    for (const member of newMembers) {
      const userId = member.id;
      const existingUser = await User.findOne({ userId });
  
      if (!existingUser) {
        // If the user is new, save the user information to MongoDB
        const newUser = new User({
          userId: member.id,
          userName:member.username||"",
          
        });
  
        await newUser.save();
  
        // Send a message to the admin
        const adminMessage = `New user joined!\nID: ${userId}\nName: ${member.first_name} ${
          member.last_name ? member.last_name : ""
        }\nUsername: ${member.username ? member.username : ""}`;
        
        await bot.sendMessage(  1241390756, adminMessage);
      }
    }
  });

const handleNewUser = async (msg) => {
  const user = await User.find({ userId });

  if(!user){
    return "new user"
  }
  
};
