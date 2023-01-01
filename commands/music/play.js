const Discord = require('discord.js');

module.exports = {
    name: 'play',
    category: 'music',
    aliases: ['p'],
    inVoiceChannel: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const string = args.join(' ');
        if (!string) return message.reply(`🛑 | Bạn phải nhập link của bài hát hoặc tên tìm kiếm!!!`);
        client.distube.play(message.member.voice.channel, string, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}