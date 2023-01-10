require('dotenv').config();
const mineflayer = require('mineflayer');


module.exports = {
    name: 'chat',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {string} chat
     * @param {string} username
     */
    async run(bot, username, chat) {
        const msg = chat.toString();
        let args = msg.trim().split(/ +/g);
        if (args[0] === '>') args = args.slice(1);
        if (!args[0]) return;
        if (args[0] === bot.player.username) return bot.chat(`Prefix: ${bot.prefix}`);
        if (!args[0].startsWith(bot.prefix)) return;
        args[0] = args[0].slice(bot.prefix.length);

        const cmd = await bot.commands.find(c => c.name === args[0]);
        if (!cmd) return;
        args = [username.toString()].concat(args);
        if (username === bot.player.username) await require('node:timers/promises').setTimeout(1000).catch(e => {});
        cmd.run(bot, username, args);
    }
}