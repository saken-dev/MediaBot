const Telegraf = require('telegraf')
const bot = new Telegraf('')
const HelpMessage = `
Команды для бота
/newyork - фотка города Нью Йорк
/dubai - ГИФка с красивым Дубай
/singapore - геолокация Сингапура
/citieslist - список городов
/city - альбом с фотографиями городов
`

bot.start((ctx) => {
    ctx.reply('Привет! Я Медиа бот. Для того что бы узнать команды введи /help')
})

bot.help((ctx) => {
    ctx.reply(HelpMessage)
})

bot.command("newyork", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/newyork.jpg"
    },
    {
        reply_to_message_id: ctx.message.message_id
    })
})

bot.command("dubai", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video")
    bot.telegram.sendAnimation(ctx.chat.id, "https://i.gifer.com/Btm3.mp4",
    {
        reply_to_message_id: ctx.message.message_id
    })
})

bot.command("city", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    let cities = ['res/dubai.jpg', 'res/hongkong.jpg', 'res/london.jpg', 'res/singapore.jpg', 'res/dubai.jpg']
    let result  = cities.map(city => {
        return{
            type: 'photo',
            media:{
                source: city
            }
        }
    })
    bot.telegram.sendMediaGroup(ctx.chat.id, result, 
    {
        reply_to_message_id: ctx.message.message_id
    })
})

bot.command("citieslist", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document")
    bot.telegram.sendDocument(ctx.chat.id, { source: "res/citieslist.txt" }, 
    {
        thumb: {source: "res/london.jpg" } 
    })
})

bot.command("singapore", (ctx) => {
    bot.telegram.sendLocation(ctx.chat.id, 1.329605, 103.861314)
})

bot.launch()
