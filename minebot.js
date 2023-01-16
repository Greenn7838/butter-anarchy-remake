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
    bot.on('windowOpen', async (window) => { // Thực hiện khi khung login hiện ra
        // Sửa dòng leak memory
        window.requiresConfirmation = false;
    
        /* 
         * Nhập 4 số mã pin. Nhưng cần nhập trong .env 
         * Cách nhập: Thí dụ pin là 9999, thì đặt phần pin là 9,9,9,9 ( Thí dụ: PIN=9 9 9 9 )
         */
        var v = process.env.PIN;
        var p1 = v.split(" ")[0]; // lấy mã trước dấu cách
        var p2 = v.split(" ")[1]; // lấy mã sau dấu cách thứ 1
        var p3 = v.split(" ")[2]; // lấy mã sau dấu cách thứ 2
        var p4 = v.split(" ")[3]; // lấy mã sau dấu cách thứ 3
    
    
        if(!p1 || !p2 || !p3 || !p4) return console.log("Vui lòng kiểm tra lại mã pin, phải ghi đúng như example, hãy đặt nếu như bạn chưa đặt nó.");
    
        // Thực hiện các mã pin đã được đặt
        bot.clickWindow(p1, 0, 0);
        bot.clickWindow(p2, 0, 0);
        bot.clickWindow(p3, 0, 0);
        bot.clickWindow(p4, 0, 0);
    
        // Cho bot vào server
        setTimeout(() => { bot.chat('/anarchyvn'); sendEmbed(bot, client, new Discord.MessageEmbed().setColor('GREEN').setDescription('Đã nhập `/anarchyvn`')) }, 5*1000); // Dùng /2y2c sau khi login xong
    
        setTimeout(() => { bot.clickWindow(13,0,0); sendEmbed(bot, client, new Discord.MessageEmbed().setColor('YELLOW').setDescription(`Đã click ${emojis.crystal} \`End Crystal\``)) }, 10*1000); // Sau đó bấm vào khung kia để vào server
    });
    

    setInterval(async() => {
        const tps = bot.getTps() ? bot.getTps() : 20;
        const players = bot.players ? Object.values(bot.players).length : 1;
        const ping = bot.player ? bot.player.ping : 0;
        await client.user.setPresence({ activities: [{ name: `TPS: ${tps} | Players: ${players} | Ping: ${ping}ms`, type: 'WATCHING' }], status: 'online' })
    }, 5 * 1000);


    bot.on('message', async(msg) => {
        const embed = new Discord.MessageEmbed();
        await embedColor(embed, msg.toString());
        sendEmbed(bot, client, embed);
    });

    // chat Patterns
    bot.addChatPattern('tps', /.*/tps, { parse: true });
    bot.on('chat:tps', (user) => {
        bot.chat(`/w ${user} TPS: ${bot.getTps()}`);
    });
    bot.addChatPattern('server', /.*/tps, { parse: true });
    bot.on('chat:server', async(msg) => {
        await util.status(process.env.IP).then((res) => {
            bot.chat(`> TPS: ${bot.getTps()} | Ping: ${bot.player.ping}ms | Players: ${res.players.online} / ${res.players.max} [${stringGen(4)}]`)
        });
    });
    bot.addChatPattern('coords', /.*/coords, { parse: true });
    bot.on('chat:coords', (msg) => {
        bot.chat(`> Toạ độ đang đứng: X: ${bot.entity.position.x} Y: ${bot.entity.position.y} Z: ${bot.entity.position.z} [${stringGen(4)}]`)
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

// custom embed variables
const colors = {
    red : '#ff1a1a',
    green : '#00cc00',
    blue : '#0040ff',
    yellow : '#ffd633',
    purple: '#8000ff',
    pink : '#ff33cc'
};
const deathprefix = '[ANARCHYVN]';
const donatorprefix = '<[Donator]';
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.MessageEmbed} embed 
 * @param {String} msg 
 */
async function embedColor(embed, msg) {
    let str = ``;
    if (msg.startsWith(deathprefix)) {
        // death event
        str = `${emojis.death} ${msg}`;
        embed.setColor(colors.red).setDescription(str);
    } else if (msg.startsWith(donatorprefix)) {
        str = `${emojis.donator} ${msg}`;
        embed.setColor(colors.yellow).setDescription(str);
    } else {
        str = `${msg}`;
        embed.setColor(colors.blue).setDescription(str);
    };
}

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {Discord.Client} client 
 * @param {Discord.MessageEmbed} embed 
 */
async function sendEmbed(bot, client, embed) {
    const channel = await client.channels.cache.get(process.env.DISCORD_LIVECHAT);
    if (!channel) return;
    await channel.send({ embeds: [embed] });
}

function stringGen(yourNumber){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < yourNumber; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return text;
  }

module.exports = createBot
