const Discord = require('discord.js');
require('dotenv').config();
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
module.exports = async(client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    if (!message.content.startsWith(process.env.PREFIX)) return;
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (command) {
            if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Discord.Collection());
            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3 ) * 1000;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime ) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`Vui lòng chờ \`${timeLeft.toFixed(1)}\` giây để sử dụng lệnh này!`);
                }
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
            }
            command.run(client,message,args);
        }
}