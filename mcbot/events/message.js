require('dotenv').config();
const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const emojis = require('../../emojis.json');
const prefix = process.env.PREFIX;

/**
 * @param {mineflayer.Bot} bot 
 * @param {string} msg
 */
module.exports = {
    name: 'message',
    async run(bot, msg) {
        try {
            bot.client.channels.cache.get(process.env.DISCORD_LIVECHAT).send({ embeds: [new Discord.MessageEmbed()
                .setColor('AQUA')
                .setDescription(msg.toString())
            ] })
        } catch(e) { console.error(e) }
    }
}