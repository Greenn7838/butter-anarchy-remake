require('dotenv').config();
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const Discord = require('discord.js');
const emojis = require('./emojis.json');
const afk = require('mineflayer-antiafk');
const util = require('minecraft-server-util');
const ms = require('ms');

// main function
/**
 * 
 * @param {Discord.Client} client 
 */
async function createBot(client) {
    const bot = mineflayer.createBot({
        host: process.env.IP,
        port: 25565,
        username: process.env.NAME,
        version: '1.16.5',
        checkTimeoutInterval: 10 * 60 * 1000
    });
    bot.loadPlugin(tpsPlugin);
    bot.commands = [];
    bot.client = client;
    const prefix = '$';

    bot.loadPlugin(afk);

    bot.afk.start();

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;
        if (msg.channel.id != process.env.DISCORD_LIVECHAT) return;
        bot.chat(`> [${msg.author.tag}] ${msg.toString()} [${stringGen(4)}]`);
        msg.react(emojis.check);
    });

    // MCBot events ------------------------------------------
    bot.on('windowOpen', async (window) => {
            const pin = process.env.PIN;
            if (Number(window.slots.length) == 45) {
                bot.clickWindow(pin.split(' ')[0], 0, 0);
                bot.clickWindow(pin.split(' ')[1], 0, 0);
                bot.clickWindow(pin.split(' ')[2], 0, 0);
                bot.clickWindow(pin.split(' ')[3], 0, 0);
                // send to server
                sendEmbed(bot, client,
                    new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`Đã nhập mã PIN ${emojis.check}`)
                );
            }
            
                setTimeout(() => {
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Đã nhập `/anarchyvn`');
                    bot.chat('/anarchyvn');
                    sendEmbed(bot, client, embed);
                }, 5 * 1000);
        
            setTimeout(() => {
                bot.clickWindow(13, 0, 0); // click Endcrystal
                sendEmbed(bot, client,
                    new Discord.MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle(`Đã click ${emojis.crystal} \`End Crystal\``)
                )
            }, 5 * 1000);
    })

    setInterval(() => {
        const tps = bot.getTps() ? bot.getTps() : 20;
        const players = bot.players ? Object.values(bot.players).length : 1;
        const ping = bot.player ? bot.player.ping : 0;
        client.user.setActivity({ name: `TPS: ${tps} | Players: ${players} | Ping: ${ping}ms`, type: 'WATCHING' });    
    }, 5 * 1000);


    bot.on('message', async(msg) => {
        const message = msg.toString();
        await sendEmbed(bot, client, new Discord.MessageEmbed().setColor('AQUA').setDescription(message));
    });

    bot.on('chat', (user, chat) => {
        const msg = chat.toString();
        if (!msg.startsWith(prefix)) return;
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        switch(args) {
            case 'tps':
                bot.chat(`/w ${user} TPS: ${bot.getTps()}`);
                break;
            case 'ping':
                bot.chat(`> Ping: ${bot.player.ping}ms [${stringGen(4)}]`);
                break;
            case 'server':
                util.status(process.env.IP).then((res) => {
                    bot.chat(`> TPS: ${bot.getTps()} | Players: ${res.players.online} / ${res.players.max} | Uptime: ${ms(client.uptime)} | [${stringGen(4)}]`)
                });
                break;
        };
    });

    bot.on('end', (reason) => {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`${emojis.danger} Bot đã mất kết nối đến server ${process.env.IP}, kết nối lại sau 5 phút`);
        sendEmbed(bot, client, embed);
        console.log(`[Mineflayer] Bot mất kết nối tới server ${process.env.IP}, đang kết nối lại...`);
        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setDescription(`Đang kết nối lại server \`${process.env.IP}\`...`);
            sendEmbed(bot, client, embed);
            createBot(client);
        }, ms('5m'))
    })
}

async function sendEmbed(bot, client, embed) {
    const channel = await client.channels.cache.get(process.env.DISCORD_LIVECHAT);
    if (!channel) return;
    channel.send({ embeds: [embed] });
}

function stringGen(yourNumber){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < yourNumber; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return text;
  }

module.exports = createBot
