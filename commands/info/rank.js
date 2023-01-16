const Levels = require('discord-xp');
const { Client, Message } = require('discord.js');

module.exports = {
    name: 'rank',
    aliases: ['level', 'lvl'],
    description: 'Xem level của bạn',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     */
    run: async(client, message, args) => {
        const user = Levels.fetch(message.author.id);
        message.channel.send(`**${message.author.username}** hiện tại đang ở level **${user.level}**`);
    }
}