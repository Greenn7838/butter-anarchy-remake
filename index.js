require('events').EventEmitter.setMaxListeners(100);
require('dotenv').config();
const app = require('express')();
const Discord = require('discord.js');
const fs = require('fs');
const Levels = require('discord-xp');
const client = new Discord.Client({
    intents: 40863,
});

module.exports = client;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');
client.cooldowns = new Discord.Collection();
client.emoji = require('./emojis.json');

require('./handlers/command')(client);
require('./handlers/event')(client);

require('./minebot')(client).then(() => console.log('Đã đăng nhập Mineflayer API'));

require('./web')(app);

Levels.setURL(process.env.MONGODB);

client.on('messageCreate', async(message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send({ content: `${message.author}, chúc mừng bạn đã lên level **${user.level}**! :tada:` });
    }
})

client.login(process.env.DISCORD_TOKEN);
