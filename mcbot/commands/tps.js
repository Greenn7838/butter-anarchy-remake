const mineflayer = require('mineflayer');

module.exports = {
    name: 'tps',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {string} username
     * @param {string} args
     */
    run: async(bot, username, args) => {
        const chat = args[0] == bot.players.username ? '' : `/w ${args[0]}`
        
        bot.whisper(username, `${chat} TPS: ${bot.getTps()}`)
    }
}