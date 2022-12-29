const fs = require('fs');

module.exports = (client) => {
    fs.readdirSync('./commands').forEach(dir => {
    const files = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    for (const file of files) {
        const pull = require(`../commands/${dir}/${file}`);
        if (pull.name) {
            client.commands.set(pull.name, pull);
        } else {
            continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
    }
});
}