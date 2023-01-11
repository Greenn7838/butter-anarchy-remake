require('events').EventEmitter.setMaxListeners(20);
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

try {
    require('dotenv').config({ path: '/etc/secrets/.env' });
    client.login(process.env.DISCORD_TOKEN).catch((e) => {});
} catch(err) {
    console.log(`[DISCORD] Đã xảy ra lỗi khi đăng nhập bằng token`, err);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

require('./minebot')(client).then(() => console.log('Đã đăng nhập Mineflayer API'));
