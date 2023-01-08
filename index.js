require('dotenv').config();
const express = require('express');
const app = express();
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

const createBot = require('./minebot');
createBot(client);
//require('./web')(app);

client.login(process.env.DISCORD_TOKEN);
