const { Client, Interaction } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return;
    const cmd = client.interactions.get(interaction.commandName);
    if (!cmd) return;
    cmd.run(client, interaction);
}