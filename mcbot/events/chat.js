require('dotenv').config();
const mineflayer = require('mineflayer');

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {string} msg 
 */
module.exports = (bot, msg) => {
    if (!msg.toString().startsWith(process.env.PREFIX)) return;
    const args = msg.toString().slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = bot.commands.find(c => c.name === cmd);
    if (command) command.run(bot, msg);
}