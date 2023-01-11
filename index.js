require('events').EventEmitter.setMaxListeners(20);
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

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

if (!client.isReady()) { return; }
else {
    require('./minebot')(client).then(() => console.log('Đã đăng nhập Mineflayer API'));
}

require('./web')(app);

console.log(process.env.DISCORD_TOKEN);
//client.login(process.env.DISCORD_TOKEN);
