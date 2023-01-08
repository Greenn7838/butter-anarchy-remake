const mineflayer = require('mineflayer');

module.exports = {
    name: 'tps',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     */
    run: async(bot, msg) => {
        const tps = await bot.getTps() ? bot.getTps() : 20;

        bot.chat(`> TPS: ${tps}`)
    }
}