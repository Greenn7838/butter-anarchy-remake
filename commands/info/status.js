const Discord = require('discord.js');
const mcUtil = require('minecraft-server-util');
const asciitable = require('ascii-table');

module.exports = {
    name: 'status',
    aliases: ['sv', 'server', 'stt'],
    category: 'server',
    description: 'Check status server',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let faviconURL = '';
        const embed = new Discord.MessageEmbed();
        const table = new asciitable();
        mcUtil.status('anarchyvn.net', 25565)
            .then(res => {
                table.addRow(`IP server: ${args[0].toLowerCase()}`)
                    .addRow(`Version: ${res.version.name}`)
                    .addRow(`👥 Players: ${res.players.online} / ${res.players.max}`)
                    .addRow(`MOTD: ${res.motd.clean}`);
                faviconURL = `https://eu.mc-api.net/v3/server/favicon/${args[0]}`;
                    embed.setColor('GREEN')
                    .setTitle('Status checked!')
                    .setThumbnail(faviconURL)
                    .setDescription('```' + table.toString() + '```');
                    message.reply({ embeds: [embed.toJSON()] })

            });
        
    }
}