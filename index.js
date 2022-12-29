require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({
    intents: 32767,
    allowedMentions: {
        repliedUser: false,
        roles: false,
        users: false
    }
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.DISCORD_TOKEN);