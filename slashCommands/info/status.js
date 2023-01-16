const util = require('minecraft-server-util');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'status',
    description: 'Xem trạng thái của một server minecraft',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'address',
            description: 'IP của server cần tìm',
            type: 'STRING',
            required: true,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const addr = interaction.options.getString('address');
        if (!addr || !addr.includes('.')) return interaction.reply(client.emoji.x + 'IP server không hợp lệ!!!');
        util.status(addr).then((res) => {
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('Trạng thái server ' + addr)
                .addFields(
                    {
                        name: 'Người chơi',
                        value: `${res.players.online} / ${res.players.max}`,
                        inline: true
                    },
                    {
                        name: 'Phiên bản',
                        value: `${res.version.name}`,
                        inline: true
                    },
                    {
                        name: 'MOTD',
                        value: res.motd.clean,
                        inline: false
                    }
                )
                .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${addr}`);
            interaction.reply({ embeds: [embed] })
        })
    }
}