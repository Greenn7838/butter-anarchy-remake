const fs = require('fs');

/**
 * 
 * @param {Array} array 
 */
module.exports = (array) => {
    const files = fs.readdirSync('./mcbot/commands').filter(file => file.endsWith('.js'));
    for (const file of files) {
        const command = require(`../commands/${file}`);
        if (!command || !command.name || !command.run) continue;
        const cmd = array.find(c => c.name === command.name);
        if (cmd) throw new Error('Có file lệnh đã bị dupe...');
        array.push({
            name: command.name,
            aliases: command.aliases,
            run: command.run
        });
    }
}