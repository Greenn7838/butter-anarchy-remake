const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Lấy avatar của bạn hoặc người khác',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn lấy avatar',
            type: 'USER',
            required: false,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });
        const embed = new MessageEmbed()
            .setTitle('Download avatar')
            .setURL(avatarUrl)
            .setImage(avatarUrl);
        interaction.reply({ embeds: [embed] });
        
    }
}