require('dotenv').config();
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const Discord = require('discord.js');
const { DisTube } = require('distube');
const fs = require('fs');
const client = new Discord.Client({
    intents: 32767,
    allowedMentions: {
        repliedUser: false,
        roles: false,
        users: false
    }
});

// DisTube player
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: true,
    plugins: [
        new SpotifyPlugin({ emitEventsAfterFetching: true }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
    ],
    youtubeDL: false
});

// status
const status = (queue) => 
    `Âm lượng: \`${queue.volume}%\` | Bộ lọc: \`${queue.filters.join(', ') || 'Off'}\` || Lặp lại: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? "All queue" : "This song") : 'Off'
    }\` | Tự động phát: \`${queue.autoplay ? 'On' : 'Off'}\``;
    client.distube
        .on('playSong', (queue, song) => {
            queue.textChannel.send(`▶ | Đang phát bài: \`${song.name}\` - \`${song.formattedDuration}\` | Yêu cầu bởi: ${song.user} \n${status(queue)}`)
        })
        .on('addSong', (queue, song) => {
            queue.textChannel.send(`✅ | Đã thêm \`${song.name}\` - \`${song.formattedDuration}\` tới hàng chờ bởi ${song.user}`)
        })
        .on('addList', (queue, playlist) => {
            queue.textChannel.send(`✅ | Đã thêm playlist \`${playlist.name}\` (${playlist.songs.length} bài hát) tới hàng chờ\n${status(queue)}`)
        })
        .on('error', (channel, e) => {
            channel.send(`⚠ | Đã có lỗi xảy ra ${e.toString().slice(0, 1974)}`)
            console.error(e);
        })
        .on('empty', channel => channel.send('Không có ai trong phòng voice, đang rời...'))
        .on('searchNoResult', (message, query) => {
            message.reply(`⚠ | Không thể tìm \`${query}\`!!`)
        })
        .on('finish', queue => queue.textChannel.send('Đã phát hết bài hát trong danh sách chờ!!!'))
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

// const createBot = require('./minebot');
// createBot(client);

client.login(process.env.DISCORD_TOKEN);