require('dotenv').config();
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const Discord = require('discord.js');
const emojis = require('./emojis.json');
const afk = require('./mcbot/handlers/afk');

// main function
/**
 * 
 * @param {Discord.Client} client 
 */
async function createBot(client) {
    const bot = mineflayer.createBot({
        host: process.env.MC_IP,
        port: 25565,
        username: process.env.MC_USERNAME,
        version: '1.16.5',
        checkTimeoutInterval: 10 * 60 * 1000
    });
    bot.loadPlugin(tpsPlugin);
    bot.commands = [];
    bot.client = client;


    require('./mcbot/handlers/command')(bot.commands);
    require('./mcbot/handlers/event')(bot);

    bot.loadPlugin(afk);

    bot.afk.start();

    presence(bot, client) // set presence

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;
        if (msg.channel.id != process.env.DISCORD_LIVECHAT) return;
        bot.chat(`> [${msg.author.tag}] ${msg.toString()} [${stringGen(4)}]`);
        msg.react(emojis.check);
    })

}

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {Discord.Client} client 
 */
async function presence(bot, client) {
    setInterval(() => {
        const tps = bot.getTps() ? bot.getTps() : 20;
        const players = bot.players ? Object.values(bot.players).length : 1;
        const ping = bot.player ? bot.player.ping : 0;
        client.user.setActivity({ name: `TPS: ${tps} | Players: ${players} | Ping: ${ping}ms`, type: 'WATCHING' });    
    }, 5 * 1000);
};



function stringGen(yourNumber){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < yourNumber; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return text;
  }

module.exports = createBot