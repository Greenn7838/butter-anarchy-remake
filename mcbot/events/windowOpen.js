// AnarchyVN login api
const mineflayer = require('mineflayer');
const prismarineWindows = require('prismarine-windows');
const Discord = require('discord.js');
require('dotenv').config();

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {prismarineWindows.Window} window 
 */

module.exports = {
    name: 'windowOpen',
    async run(bot, window) {
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

        const embed = new Discord.MessageEmbed();
        // Cho bot vào server
        setTimeout(() => {
            // dùng /anarchyvn để cho bot vào server
            bot.chat('/anarchyvn');
            embed.setColor('GREEN').setTitle('Đã nhập `/anarchyvn`');
        }, 5 * 1000);
        setTimeout(() => {
            bot.clickWindow(13, 0, 0);
            embed.setColor('YELLOW').setTitle('Đã click `Vào AnarchyVN`');
        }, 10 * 1000);

        bot.client.channels.cache.get(process.env.DISCORD_LIVECHAT).send({ embeds: [embed] });
    }
}