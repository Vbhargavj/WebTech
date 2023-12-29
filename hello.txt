from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, KeyboardButton, ReplyKeyboardMarkup
import telegram
from telegram.ext import ConversationHandler


group_id = '-1001962750280'
adminid = 1241390756
userDict = [1241390756]
bannedUserList = [12,]
forcesub = [1241390756,]
f = False
banned = False

# ||__||__||__||__||__||__||here start all the function of mode||__||__||__||__||__||__||__||__||
# mode is use optional feature for the admin and bot


def log(text, context=True):
    bot_token = '5981185830:AAH5CPc5vf0IkIIVjn1yQdI5wjAe6V113Q0'
    chat_id = '-1001834878605'  # Replace with your group's chat ID
    bot = telegram.Bot(token=bot_token)

    if context:
        text = f'{text}'

    bot.send_message(chat_id=chat_id, text=text)
    
def mode(update, context):
    if update.message.from_user.id == adminid:
        log("admin use mode function")
        # here the all of the mode changes here
        t1 = f"Status of force sub is {f}\nStatus of banned user is {banned}\n*info*\nf false means force sub is deactive\nbanned True means banned user allow to access the bot\n*Command*\n `/fs` is used to force sub allowed denied access\n`/ba` is used to active or deactive of banned user permission"
        update.message.reply_text(text=t1, parse_mode='MarkdownV2')
    else:
        log(str(update.message.from_user.name) + " is try to access the command")
        update.message.reply_text(text="Abe lauvde aukat me reh")


def ba(update, context):
    # this is handle true and false of f
    if update.message.from_user.id == adminid:
        log("Admin use ba function")
        global banned
        if banned is False:
            log("Now ba is active. banned user can access the bot")
            banned = True
            update.message.reply_text(
                text="Now banned user not allowed to access the bot")
        else:
            log("Now ba is dective. banned user can not access the bot")
            banned = False
            update.message.reply_text(
                text="Now banned user allowed to access the bot")
    else:
        log(str(update.message.from_user.name) + " is try to access the command")
        update.message.reply_text(text="Abe lauvde aukat me reh")

# fs is used to force-subscribe the channel


def fs(update, context):
    # this is handle true and false of f
    if update.message.from_user.id == adminid:
        log("admin access the fs command")
        global f
        if f is False:
            log("Now fs is dective. user have must be join channel")
            f = True
            update.message.reply_text(text="Now force subcribe is active")
        else:
            log("Now fs is active. user have no need to must be join channel")
            f = False
            update.message.reply_text(text="Now force subcribe is deactive")
    else:
        log(str(update.message.from_user.name) + " is try to access the command")
        update.message.reply_text(text="Abe lauvde aukat me reh")

# ||__||__||__||__||__||__||here close the function of mode||__||__||__||__||__||__||__||__||


def start(update, context):
    update.message.reply_text(text='Hello welcome to the bot')
    new_user_message = update.message
    nUser = new_user_message.from_user.id
    log(update.message.from_user.name+"user use start command")
    
    if f:

        if is_user_subscribed(context.bot, group_id, update.effective_user.id):
            if nUser in forcesub:
                forcesub.remove(nUser)
            update.message.reply_text(
                text="You are now channel/group subscribed, so you can continue")
        else:
            forcesub.append(nUser)
            update.message.reply_text(
                text="You are no channel/group subscribed, so you can not continue")

    try:
        keyboard = [
            [InlineKeyboardButton("Ask", callback_data=nUser)],
            [InlineKeyboardButton("Notify", callback_data='button2')],
            [InlineKeyboardButton("Banned", callback_data='banned')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        if nUser not in userDict:
            userDict.append(nUser)

        # Build the notification message
            notification_text = "ToTaL UsEr: {}\nUser_id: {}\nNew user: {}\nUsername: @{}".format(len(userDict),nUser,new_user_message.from_user.first_name,new_user_message.from_user.username)
            context.bot.send_message(
                chat_id=adminid, text=notification_text)

            context.bot.send_message(
                chat_id=adminid, text='Press a button:', reply_markup=reply_markup)
    except Exception as e:
        update.message.reply_text(chat_id=adminid, text="I am not ready"+e)


def is_user_subscribed(bot, group_id, user_id):
    log("user checking for subscribed channel")
    chat_member = bot.get_chat_member(chat_id=group_id, user_id=user_id)
    return chat_member.status == 'member' or chat_member.status == 'creator'

# this function is used to ban user


def ban(user_id):
    log("Admin ban the user "+user_id)
    try:
        bannedUserList.append(user_id)
        log(user_id+"user banned successfully")
        return ("user banned successfully")
    except Exception as e:
        log("something error in ban")
        return str(e)

# this function is used to unban the user


def unban(update, context):
    if update.message.from_user.id == adminid:
        log("Admin use unban command")
        try:
            user = context.args[0]
            bannedUserList.remove(int(user))
            update.message.reply_text("user unbanned successfully")
        except Exception as e:
            log("Somthing wrong in unban")
            update.message.reply_text(str(e))
    else:
        log(str(update.message.from_user.name) + " is try to access the command")
        update.message.reply_text(text="Abe lauvde aukat me reh")


def button_callback(update, context):
    user = update.effective_user.id
    query = update.callback_query
    query.answer()

    context.bot.send_message(chat_id="1241390756", text=query.data)
    if query.data == 'ask':
        log("Admin want to question for user")
        qnagen()

    # query.edit_message_text(text=f"Button {query.data} pressed!")
    if query.data == 'banned':
        log("Admin call ban user "+user)
        context.bot.send_message(chat_id="1241390756",
                                 text=f"{ban(user) }\n`/unban {user}`", parse_mode='MarkdownV2')

# this function is used to search movie and title


def broadcast(update: Update, context):

    if update.message.from_user.id == adminid:
        # Join the arguments into a single string
        log("Admin try to broadcast message")
        message = ' '.join(context.args)
        i = 0
        for user in userDict:
            try:
                context.bot.send_message(chat_id=str(user), text=message)
            except Exception as e:
                i += 1
        context.bot.send_message(chat_id="1241390756",
                                 text="Total user"+str(len(userDict)))
        context.bot.send_message(
            chat_id="1241390756", text="Total sucessfull msg : "+str(len(userDict)-i))
        context.bot.send_message(chat_id="1241390756",
                                 text="Total unsuccessfull send msg : "+str(i))
    else:
        update.message.reply_text('You cannot access this command, mc')


def total(update: Update, context):
    if update.message.from_user.id == adminid:
        log("admin want to use total command")
        update.message.reply_text(len(userDict))
# In this modified code, the rating variable


################# QNA GEN. #########################
qna_stats = {}
option, que, ans = range(3)
qu = "how was bot give me ratting?"
# when admin want to ask question to the user trigger from this command


def qnagen(update, context):
    log("admin ask the question")
    keyboard = [[KeyboardButton(option, callback_data=option)]
                for option in options]

    update.message.reply_text(qu, reply_markup=ReplyKeyboardMarkup(keyboard))


def start_handler(update, context):
    log("admin start editing of questions")
    update.message.reply_text('Enter the question')
    return que


# after recieving the que it will store in qu and ask for option
def que_handler(update, context):
    user_input = update.message.text
    global qu
    qu = user_input
    # Process user input and update conversation context if needed
    log("editing in options")
    update.message.reply_text('Great! Now, Enter options separated by commas')
    return option


# after options that are separated one by one
def option_handler(update, context):
    user_input = update.message.text
    global options
    options = user_input.split(',')
    log("Edited question and options ")

    # Process user input and update conversation context if needed

    update.message.reply_text(f'Thanks! Now, now updated que is {qu}')

    return ConversationHandler.END


def qnagen_answer(update, context):
    answer = update.message.text
    user_id = update.effective_user.id
    log("some emplement not done yet")
    # Store the answer in the stats dictionary
    qna_stats[user_id] = answer

    update.message.reply_text('Thank you for your response!')

    return ConversationHandler.END

# if amdin want to cancel the genarating question


def cancel_handler(update, context):

    update.message.reply_text('operation cancelled')
    return ConversationHandler.END