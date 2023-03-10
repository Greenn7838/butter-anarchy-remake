const util = require('minecraft-server-util');
const { getQueue } = require('../../utils/getQueue')
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'status',
    description: 'Xem trạng thái của một server minecraft',
    type: 'CHAT_INPUT',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        let queue = await getQueue();
        util.status('anarchyvn.net').then((res) => {
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('Status AnarchyVN')
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
                        name: 'Hàng chờ',
                        value: `${queue.toString()}`,
                        inline: true
                    },
                    {
                        name: 'MOTD',
                        value: res.motd.clean,
                        inline: false
                    },
                )
                .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/anarchyvn.net`);
            interaction.reply({ embeds: [embed] })
        })
    }
}