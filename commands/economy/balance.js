const { Client, Message } = require('discord.js');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'cash', 'money'],
    description: 'Xem tài khoản của bạn có bao nhiêu tiền',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     */
    run: async(client, message, args) => {
        let profile = await client.balance(message.author.id);
        message.channel.send(`**${message.author.username}** hiện tại đang có ${client.emoji.dollar}${profile.money} tiền`)
    }
}