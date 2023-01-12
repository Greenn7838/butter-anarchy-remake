const Discord = require('discord.js');
require('dotenv').config();
const Levels = require('discord-xp');
const ms = require('ms');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
module.exports = async(client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send({ content: `${message.author}, chúc mừng bạn đã lên level **${user.level}**! :tada:` });
    }

    if (message.content.startsWith(process.env.PREFIX)) {
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
    } else {
        return;
    }
}