module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'music',
    inVoiceChannel: true,
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.reply(`🛑 | Không có bài hát nào trong danh sách phát !!`);
        const song = queue.songs[0];
        message.reply(`▶ | Đang phát: \`${song.name}\`, bởi ${song.user}`);
    }
}