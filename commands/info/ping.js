const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Xem ping của bot',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client,message,args) => {
        const embed = new Discord.MessageEmbed().setColor('YELLOW').setTitle('Đang check ping...');
        message.reply({ embeds: [embed] })
            .then((msg) => {
                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`Ping của ${client.user.tag}`)
                    .setDescription(`
                        Ping phản hồi: \`${msg.createdTimestamp - message.createdTimestamp}ms\`
                        Ping API: \`${client.ws.ping}ms\`
                    `).toJSON();
                msg.edit({ embeds: [embed] })
            })
    }
}