const { Client, Message } = require('discord.js');
const balance = require('../../models/economy');

module.exports = {
    name: 'work',
    aliases: ['w'],
    cooldown: 5 * 1000,
    description: 'Làm việc để kiếm thêm tiền',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     */
    run: async(client, message, args) => {
        const randomNum = Math.floor(Math.random() * 299) + 1;
        const profile = await client.balance(message.author.id);
        try {
            await balance.findOneAndUpdate({ userId: profile.userId }, { money: profile.money += randomNum  });
            message.reply(`**${message.author.username}** đã nhận được ${client.emoji.dollar} **${randomNum}** tiền`)
        } catch(e) {
            console.log(e);
        }
    }
}