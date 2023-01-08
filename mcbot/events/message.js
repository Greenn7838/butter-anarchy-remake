require('dotenv').config();
const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const emojis = require('../../emojis.json');
const prefix = process.env.PREFIX;

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {string} msg
 * @param {Discord.Client} client 
 */
module.exports = (bot, msg, client) => {
    const embed = new Discord.MessageEmbed();
    embedColor(embed, msg.toString(), client);
    try {
        const channel = bot.client.channels.cache.get(process.env.DISCORD_LIVECHAT);
        channel.send({ embeds: [embed] })
    } catch(e) { console.log(e) };
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