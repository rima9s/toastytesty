const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    console.log("Servers: ")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        //all channel list
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })

    })

    //gen test message
    var genChannel = client.channels.get("513468833386856460")
    genChannel.send("Hello, world!")

    //next provide a url to a file
    const webAttach = new Discord.Attachment('https://pbs.twimg.com/media/DsKFR_WVsAAiTZk.png')
    genChannel.send(webAttach)

    //changing game prescence/activity
    //client.user.setActivity("with JavaScript")
    client.user.setActivity("TV", {type: "WATCHING"})

})

client.on('message', (recievedMessage) => {
    //prevent bot to own messages loop
    if(recievedMessage.author == client.user) {
        return
    }

    //when @-ed
    if(recievedMessage.content.includes(client.user.toString())) {
        recievedMessage.channel.send("Message received from " +
         recievedMessage.author.toString() + ": " + recievedMessage.content)
    }

    if(recievedMessage.content.startsWith("!")) {
        processCommand(recievedMessage)
    }
})

//function to process the command used
function processCommand(recievedMessage) {
    let fullCommand = recievedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    console.log("Command received: " +primaryCommand)
    console.log("Arguments: " + arguments) //may be empty

    if(primaryCommand == "help") {
        helpCommand(arguments, recievedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, recievedMessage)
    } else {
        recievedMessage.channel.send("I don't understand :( Try `!help` or `!multiply`")
    }
}

//help command function
function helpCommand(arguments, recievedMessage) {
    if(arguments.length > 0) {
        recievedMessage.channel.send("It looks like you might need help with " +
         arguments) 
    } else {
        recievedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

//mutliply command function
function multiplyCommand(arguments, recievedMessage) {
    if (arguments.length < 2) {
        recievedMessage.channel.send("Not enough numbers mah dude`!`" + 
        "Try `!multiple 2 4 10` or `!multiply 5.2 7`")
        return
    }

    let product = 1
    arguments.forEach( (value) => {
        product = product * parseFloat(value)
    } )

    recievedMessage.channel.send("The product of " + arguments +
    " multiplied together is: " + product.toString())
}

//bot token comes from 
// https://discordapp.com/developers/applications/
// application -> bot -> token
bot_secret_token = "hide"

client.login(bot_secret_token)