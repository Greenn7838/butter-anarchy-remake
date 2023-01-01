module.exports = {
    name: 'leave',
    category: 'music',
    run: async(client, message, args) => {
        client.distube.voices.leave(message);
    }
}