const mineflayer = require('mineflayer');
require('dotenv').config();
const antiafk = require('../handlers/afk');
const Discord = require('discord.js');

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {Discord.Client} client 
 */
module.exports = (bot, client) => {
    antiafk(bot);
    client.channels.cache.get(process.env.DISCORD_LIVECHAT).send({ embeds: [new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Bot đang vào trạng thái `Anti-AFK`')
    ] });
}