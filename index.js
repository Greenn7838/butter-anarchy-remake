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

const startMC = (client) => {
    let retry = 0;
    if (retry <= 0) {
        client.channels.cache.get(process.env.DISCORD_LIVECHAT).send(
            new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setDescription('Đang kết nối lại tới server')
        );
        client.mcTimeout = setTimeout(() => { try { retry++; execute() } catch(e) { console.log(e) } }, 60 * 1000);
    }

const execute = () => {
    if (!client.isReady()) return client.channels.cache.get(process.env.DISCORD_LIVECHAT).send(
        new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription('Client chưa sẵn sàng')
    );

    client.channels.cache.get(process.env.DISCORD_LIVECHAT).send(
        new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription('Đang kết nối lại...')
    );

    try { require('./minebot')(client); } catch(e) { console.log(e) } 
    };

    clearTimeout(client.mcTimeout == 0 ? undefined : client.mcTimeout);
};
require('./web')(app);

client.startMC = startMC;

client.login(process.env.DISCORD_TOKEN);
