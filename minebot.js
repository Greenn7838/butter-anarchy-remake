require('dotenv').config();
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const Discord = require('discord.js');
const emojis = require('./emojis.json');
const afk = require('mineflayer-antiafk');
const util = require('minecraft-server-util');
const ms = require('ms');
const e = require('express');
const actions = ['jump'];
const statusId = '1059775588493181048';

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
    bot.loadPlugin(afk);

    bot.afk.chatMessages = []
    bot.afk.actions = actions;

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
        setTimeout(() => {
            bot.chat('/anarchyvn'); // Nhập "/anarchyvn"
            sendEmbed(
                bot,
                client,
                new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle('Đã nhập `/anarchyvn`')
            );
        }, ms('15s'));
        setTimeout(() => {
            bot.clickWindow(13, 0, 0).then(() => {
                sendEmbed(
                    bot,
                    client,
                    new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`${emojis.crystal} Đã bấm \`Chuyển server\``)
                );
            });
        }, ms('20s'));
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

    // chat Patterns - Regex: /<.+> (value)/
    bot.addChatPattern('tps', /<.+> (!tps|a!tps)/, { parse: true })
    bot.addChatPattern('server', /<.+> (!server|a!server)/, { parse: true });
    bot.addChatPattern('coords', /<.+> (!coords|a!coords)/, { parse: true });
    bot.addChatPattern('botinfo', /<.+> (!botinfo|a!botinfo)/, { parse: true });

    bot.on('chat:tps', (msg) => {
        bot.chat(`> TPS: ${bot.getTps()}`);
    });
    bot.on('chat:server', async(msg) => {
        await util.status(process.env.IP).then((res) => {
            bot.chat(`> TPS: ${bot.getTps()} | Ping: ${bot.player.ping}ms | Players: ${res.players.online} / ${res.players.max} [${stringGen(4)}]`)
        });
    });
    bot.on('chat:coords', (user, msg) => {
        bot.chat(`> Toạ độ đang đứng: X: ${bot.entity.position.x} Y: ${bot.entity.position.y} Z: ${bot.entity.position.z} [${stringGen(4)}]`)
    });
    bot.on('chat:botinfo', (msg) => {
        bot.chat(`Ping: ${bot.player.ping}ms | `)
    });

    setInterval(() => {
        const msgs = [
            'Anh có tất cả, nhưng thiếu em...',
            'Sách là nguồn tri thức dồi dào, nhưng ở đây thì khác',
            'Điều đáng sợ nhất đối với mỗi người là mỗi ngày thức dậy. Và nhận ra trong cuộc sống mình không có người và điều gì để chờ đợi, cố gắng.',
            'Không phải vết thương nào cũng chảy máu. Và cũng không phải không chảy máu là không bị đau.',
            'Cuộc sống đầy ắp những việc không như ý, chúng ta chẳng thể nào né tránh. Điều duy nhất có thể làm là thay đổi góc nhìn về nó.',
            'Điểm yếu khi ta còn trẻ là dễ mắc những sai lầm trong cuộc sống. Nhưng bù lại, chúng ta có sức sống mạnh mẽ. Dễ dàng hỏi phục và vươn lên.',
            'Thời gian là thứ quý giá mà cuộc sống ban tặng. Nó có thể đưa mọi thứ vào trong lãng quên.',
            'Từ trải nghiệm của quá khứ chúng ta ta rút ra bài học dẫn đường cho tương lai.',
            'Cuộc sống không phải là một vấn đề cần phải được giải quyết, mà là một thực tại cần phải được trải nghiệm.',
            'Free kits at 0 0 nether',
            'Sự tương tác giữa tri thức và kỹ năng với trải nghiệm là chìa khóa của việc học hỏi.',
            'Khó khăn rồi sẽ qua đi. Giống như cơn mưa ngoài cửa sổ, có tầm tã cỡ nào rồi cuối cùng cũng sẽ trời quang mây tạnh.',
            'Hãy giữ khuôn mặt bạn luôn hướng về ánh mặt trời, và bóng tối sẽ ngả phía sau bạn.',
            'Đừng bao giờ hối tiếc những điều xảy ra trong quá khứ, vì thời điểm ấy, đó chính xác là những gì bạn muốn.'
        ];
        const randNum = Math.floor(Math.random() * msgs.length);
        bot.chat(`${msgs[randNum]} ${stringGen(6)}`);
    }, ms('10m'));

    setInterval(() => {
        bot.chat('Tham gia server discord của PW ngay tại: https://dsc,gg/phoenixwarriors')
    }, ms('1m'));

    bot.on('end', (reason) => {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`${emojis.danger} Bot đã mất kết nối đến server ${process.env.IP} vì lỗi ${reason}, kết nối lại sau 5 phút`);
        sendEmbed(bot, client, embed);
        console.log(`[Mineflayer] Bot mất kết nối tới server ${process.env.IP}, đang kết nối lại...`);
        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setDescription(`Đang kết nối lại server \`${process.env.IP}\`...`);
            sendEmbed(bot, client, embed);
            createBot(client);
        }, ms('5m'));
    });
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
    let linkRegex1 = /(https:\/\/)dsc\/ gg\/.+/g;
    let linkRegex2 = /(https:\/\/dsc\/,gg\/.+)/g;
    let linkRegex3 = /(https:\/\/discord\/ gg\/.+)/g;

    if (linkRegex1.test(msg) == true) {
        msg.replace(linkRegex1, /(https:\/\/dsc.gg\/.+)/g)
    } else if (linkRegex2.test(msg) == true) {
        msg.replace(linkRegex2, /(https:\/\/dsc.gg\/.+)/g)
    } else if (linkRegex3.test(msg) == true) {
        msg.replace(linkRegex3, /(https:\/\/discord.gg\/.+)/g)
    }

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

/**
 * 
 * @param {Number} yourNumber 
 * @returns 
 */
function stringGen(yourNumber){
    var text = "";
    var possible = "0123456789";
  
    for (var i = 0; i < yourNumber; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return text;
  }

module.exports = createBot
