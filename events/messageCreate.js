const Discord = require('discord.js');
require('dotenv').config();
const Levels = require('discord-xp');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
module.exports = async(client, message) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    if (message.author.bot || !message.content.startsWith(process.env.PREFIX) || !message.guild) return;

    const hasLeveledUp = Levels.appendXp(message.author.id, message.guildId, rand);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`🎉 ${message.author}, bạn đã lên cấp ${user.level}`)
    }
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client,message,args);
}