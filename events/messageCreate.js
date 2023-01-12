const Discord = require('discord.js');
require('dotenv').config();
const Levels = require('discord-xp');
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
        if (command) command.run(client,message,args);    
    } else {
        return;
    }
}