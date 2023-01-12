require('events').EventEmitter.setMaxListeners(100);
require('dotenv').config();
const app = require('express')();
const mongoose = require('mongoose');
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
client.emoji = require('./emojis.json');

require('./handlers/command')(client);
require('./handlers/event')(client);

require('./minebot')(client).then(() => console.log('Đã đăng nhập Mineflayer API'));

require('./web')(app);

//Levels.setURL('mongodb+srv://tung:1@avocadotree.dtmlcbu.mongodb.net/?retryWrites=true&w=majority');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'));

mongoose.set('strictQuery', false);

client.login(process.env.DISCORD_TOKEN);
