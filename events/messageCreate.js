const Discord = require('discord.js');
require('dotenv').config();
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */
module.exports = (client, message) => {
    if (message.author.bot || !message.content.startsWith(process.env.PREFIX) || !message.guild) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client,message,args);
}