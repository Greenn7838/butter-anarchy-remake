require('dotenv').config();
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const Discord = require('discord.js');
const emojis = require('./emojis.json');

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

    bot.on('windowOpen', async (window) => { // Thực hiện khi khung login hiện ra
        // Sửa dòng leak memory
        window.requiresConfirmation = false;
    
        /* 
         * Nhập 4 số mã pin. Nhưng cần nhập trong .env 
         * Cách nhập: Thí dụ pin là 9999, thì đặt phần pin là 9,9,9,9 ( Thí dụ: PIN=9 9 9 9 )
         */
        var v = process.env.MC_PIN;
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
        setTimeout(() => { bot.chat('/anarchyvn') }, 15*1000); // Dùng /2y2c sau khi login xong
    
        setTimeout(() => { bot.clickWindow(13,0,0) }, 20*1000); // Sau đó bấm vào khung kia để vào server
    });

    bot.on('message', async(msg) => {
        const embed = new Discord.MessageEmbed();
        embedColor(embed, msg, client);
        client.channels.cache.get(process.env.DISCORD_LIVECHAT).send({ embeds: [embed] });
    });

    bot.on('end', (reason) => { console.log(reason) }); // bao cao ly do bot k chay

    presence(bot, client) // set presence

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;
        if (msg.channel.id != process.env.DISCORD_LIVECHAT) return;
        msg.react(emojis.check);
        bot.chat(`> [${msg.author.tag}] ${msg.toString()} [${stringGen(4)}]`);
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

/**
 * 
 * @param {Discord.MessageEmbed} embed 
 * @param {String[]} msg 
 * @param {Discord.Client} client 
 */

function embedColor(embed, msg, client) {
    const deathprefix = '[ANARCHYVN]';
    const donatorprefix = '<[Donator]';
    if (msg.toString().startsWith(deathprefix)) {
        embed.setColor('DARK_RED').setDescription(`${emojis.death} ${msg.toString()}`); // death event
    } else if (msg.toString().startsWith(donatorprefix)) {
        embed.setColor('GOLD').setDescription(`${emojis.donator} ${msg.toString()}`); // donators' chat
    } else {
        embed.setColor('BLUE').setDescription(msg.toString()); // normal chat
    };
    if (msg.toString().match(/[A-Za-z0-9_]/ + ' has made the advancement ' + /[A-Za-z0-9_! ]/)) {
        try {
            embed.setColor('GREEN').setDescription(`${emojis.success} ${msg.toString()}`);
        } catch (error) {
            console.error(error);
        };
    };
};

function stringGen(yourNumber){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < yourNumber; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return text;
  }

module.exports = createBot