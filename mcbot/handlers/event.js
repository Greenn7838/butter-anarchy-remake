const fs = require('fs');
const mineflayer = require('mineflayer');

/**
 * @param {mineflayer.Bot} bot 
 */
module.exports = (bot) => {
    const files = fs.readdirSync('./mcbot/events').filter(file => file.endsWith('.js'));
    for (const f of files) {
        const event = require(`../events/${f}`);
        if (event.name) {
            if (!event.discord || event.discord == false) 
                bot.on(event.name, (...args) => {event.run(bot, ...args)});
            bot.client.on(event.name, (...args) => {event.run(client, ...args)});
        };
    };
};