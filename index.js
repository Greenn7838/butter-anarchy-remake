require('events').EventEmitter.setMaxListeners(100);
require('dotenv').config();
const app = require('express')();
const mongoose = require('mongoose');
const Discord = require('discord.js');
const economy = require('./models/economy');
const fs = require('fs');
const Levels = require('discord-xp');
const client = new Discord.Client({
    intents: 32767,
    allowedMentions: {
        repliedUser: false,
        roles: false,
        users: false
    }
});

module.exports = client;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');

require('./handlers/command')(client);
require('./handlers/event')(client);

require('./minebot')(client).then(() => console.log('Đã đăng nhập Mineflayer API'));

require('./web')(app);

Levels.setURL(process.env.MONGODB);

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'));

client.profile = async(id) => {
    let profile = await economy.findOne({ id });
    if (!profile) {
        profile = new economy({ id: id, money: 100 });
        profile.save();
        return profile;
    } else {
        return profile;
    }
}

client.add = async(id, num) => {
    let profile = await economy.findOne({ id });
    if (!profile) {
        profile = new economy({ id: id, money: 100 + num });
        profile.save();
        return profile;
    } else {
        profile.money = profile.money + num;
        return profile;
    }
}

client.rmv = async(id, num) => {
    let profile = await economy.findOne({ id });
    if (!profile) {
        profile = new economy({ id: id, money: 100 });
        profile.save();
        return profile;
    } else {
        if (profile.money == 0) profile.money = 0;
        profile.money = profile.money - num;
        return profile;
    }
}

client.login(process.env.DISCORD_TOKEN);
