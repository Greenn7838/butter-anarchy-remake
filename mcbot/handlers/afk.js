const mineflayer = require('mineflayer');

/**
 * 
 * @param {mineflayer.Bot} bot 
 */
module.exports = async(bot) => {
    setInterval(async () => {
            let yaw = 2*Math.random()* Math.PI - (0.5*Math.PI);
            let pitch = Math.random()* Math.PI - (0.5*Math.PI);
            await bot.look(yaw, pitch, true);
    }, 5 * 1000)
}