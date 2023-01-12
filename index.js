require('events').EventEmitter.setMaxListeners(100);
require('dotenv').config();
const app = require('express')();
const mongoose = require('mongoose');
const balance = require('./models/economy');
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

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'));

mongoose.set('strictQuery', false);

client.balance = async(id) => {
    let profile = await balance.findOne({ userId: id });
    if (profile) {
        return profile;
    } else {
        profile = new balance({ userId: id });
        await profile.save().catch(err => console.error(err));
        return profile;
    }
}

client.login(process.env.DISCORD_TOKEN);
