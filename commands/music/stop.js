module.exports = {
    name: 'stop',
    category: 'music',
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.reply(`🛑 | Trong danh sách phát đang không có gì!!`);
        queue.stop();
        message.reply(`✅ | Đã dừng phát danh sách!!`)
    }
}