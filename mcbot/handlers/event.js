const fs = require('fs');
const mineflayer = require('mineflayer');

/**
 * 
 * @param {mineflayer.Bot} bot 
 */
module.exports = (bot) => {
    const files = fs.readdirSync('./mcbot/events').filter(file => file.endsWith('.js'));
    for (const f of files) {
        const eventName = f.substring(0, f.indexOf('.js'));
        const event = require(`../events/${f}`);
        bot.on(eventName, event.bind(null, bot))
    }
}