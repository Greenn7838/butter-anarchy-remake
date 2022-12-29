const fs = require('fs')
module.exports = (client) => {
    const files = fs.readdirSync('./events');
    for (const f of files) {
        if (!f.endsWith('.js')) return;
        const eventName = f.substring(0, f.indexOf('.js'));
        const event = require(`../events/${f}`);
        client.on(eventName, event.bind(null, client));
    }
}