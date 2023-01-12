require('events').EventEmitter.setMaxListeners(100);
require('dotenv').config();
const app = require('express')();
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

require('./handlers/command')(client);
require('./handlers/event')(client);

require('./minebot')(client).then(() => console.log('Đã đăng nhập Mineflayer API'));

require('./web')(app);

client.login(process.env.DISCORD_TOKEN);
