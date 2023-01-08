const mineflayer = require('mineflayer');
require('dotenv').config();
const options = {
    host: process.env.MC_IP,
    port: 25565,
    username: process.env.MC_USERNAME,
    version: '1.16.5'
};

/**
 * 
 * @param {mineflayer.Bot} bot 
 * @param {string} reason 
 */
module.exports = (bot, reason) => {
    if (reason === 'socketClosed') {
        console.log(`Bot đã mất kết nối tới server ${process.env.MC_IP}`);
        console.log('Đang cố gắng kết nối lại...');
        // reconnect
        setTimeout(initBot, 10 * 1000);
    }
}

const initBot = () => {
    let bot = mineflayer.createBot(options);
    console.log(`Đã kết nối tới ${options.host} bằng phiên bản ${options.version}`);
}