const Discord = require('discord.js');
const emojis = require('../../emojis.json');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'cash', 'money'],
    description: 'Kiểm tra tài khoản của bạn còn bao nhiêu tiền',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let profile = await client.profile(message.author.id);
        message.reply(`**${message.author.username}** hiện tại đang có ${emojis.dollar}${profile.money} tiền`)
    }
}