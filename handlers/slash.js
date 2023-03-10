const fs = require('fs');
const slashCommands = [];
require('dotenv').config();
const guildId = process.env.GUILDID;

module.exports = (client) => {
    fs.readdirSync('./slashCommands/').forEach(dir => {
        const commands = fs.readdirSync(`./slashCommands/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../slashCommands/${dir}/${file}`);
            if (pull.name) {
                client.interactions.set(pull.name, pull);
                slashCommands.push(pull);
            } else {
                continue;
            }
        }
    });

    client.once('ready', async() => {
        await client.guilds.cache.get(guildId).commands.set(slashCommands);
    })
}