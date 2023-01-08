require('dotenv').config();
const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const livechatId = process.env.DISCORD_LIVECHAT;
const emojis = require('../../emojis.json');

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {String[]} msg
 * @param {Discord.Client} client 
 */
module.exports = (bot, msg, client) => {
    const embed = new Discord.MessageEmbed();
    embedColor(embed, msg.toString(), client);
    client.channels.cache.get(livechatId).send({ embeds: [embed] });
}

function embedColor(embed, msg, client) {
    const deathprefix = '[ANARCHYVN]';
    const donatorprefix = '<[Donator]';
    const queuePrefix = 'Vị trí hàng chờ: ';
    if (msg.toString().startsWith(deathprefix)) {
        embed.setColor('DARK_RED').setDescription(`${emojis.death} ${msg.toString()}`); // death event
    } else if (msg.toString().startsWith(donatorprefix)) {
        embed.setColor('GOLD').setDescription(`${emojis.donator} ${msg.toString()}`); // donators' chat
    } else {
        embed.setColor('BLUE').setDescription(msg.toString()); // normal chat
    };
    if (msg.toString().match(/[A-Za-z0-9_]/ + ' has made the advancement ' + /[A-Za-z0-9_! ]/)) {
        try {
            embed.setColor('GREEN').setDescription(`${emojis.success} ${msg.toString()}`);
        } catch (error) {
            console.error(error);
        };
    };
    if (msg.toString().startsWith(queuePrefix)) {
        embed.setColor('GOLD').setDescription(msg.toString())
    }
};