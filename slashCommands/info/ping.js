const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Xem ping của bot',
    type: 'CHAT_INPUT',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        interaction.reply(`Ping: \`${client.ws.ping}ms\``)
    }
}