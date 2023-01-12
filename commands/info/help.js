const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs')

module.exports ={
    name: 'help',
    aliases: ['cmd', 'commands'],
    category: 'info',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run:async (client,message,args) => {
        const categories = [];
        const dirs = [];
        fs.readdirSync('./commands').forEach(dir => {
            let commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
            let cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`);
                return {
                    name: dir,
                    commands: {
                        name: file.name,
                        description: file.description,
                        aliases: file.aliases,
                    }
                };
            });
            categories.push(cmds.filter(cat => cat.name === dir))
        });

        categories.forEach(cat => {
            dirs.push(cat[0].name);
        });

        const emoji = {
            "info": 'ℹ',
            "music": '🎶',
            "server": '🎮'
        };
        let page = 0;
        const description = {
            "info" : "thông tin của bot",
            "server" : "về server Minecraft"
        };

        const menuOptions = [
            {
                label: 'home',
                description: 'Trang chủ',
                emoji: '🏠',
                value: 'home'
            }
        ]

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Tất cả các lệnh của ' + client.user.tag)
            .setAuthor({ name: `Prefix của bot là ${process.env.PREFIX}`, iconURL: client.user.avatarURL({ size: 4096, dynamic: true }) })
            .setDescription('Bấm vào mục dropdown phía dưới để xem từng nhóm lệnh')

        dirs.forEach((dir) => {
            embed.addField(
                `${emoji[dir] || ""} ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`,
                `Các lệnh của${description[dir] ? description[dir] : dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`
            );

            menuOptions.push({
                label: `${dir}`,
                description: `Lệnh của ${dir}`,
                emoji: `${emoji[dir] || ""}`,
                value: `${page++}`
            });
        });

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Bấm ở đây để xem lệnh')
                .addOptions(menuOptions)
        );

        var msg = await message.reply({ embeds: [embed], components:[row], fetchReply: true });

        const filter = i => !i.user.bot;
        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            time: 30000
        });

        collector.on('collect', async(i) => {
            if (i.user.id !== message.author.id) return i.reply({ content: `Lệnh help này không phải của bạn`, ephemeral: true });
            i.deferUpdate();

            const value = i.values[0];

            if (i.customId !== 'select') return;

            if (value && value !== 'home') {
                embed.fields = [];
                embed.setTitle(`${emoji[categories[value][0].name] ? emoji[categories[value][0].name] : ""} Menu Help | ${categories[value][0].name}`);

                categories[value].forEach(cmd => {
                    embed.addField(
                        `\`${process.env.PREFIX}${cmd.commands.name}\``,
                        `${cmd.commands.description || 'Không có description'}`,
                        true
                    )
                });


                msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true })
            }

            if (value === 'home') {
                embed.fields = [];
                embed.setTitle(`Tất cả các lệnh của ${client.user.tag}`)

                dirs.forEach(dir => {
                    embed.addField(
                        `${emoji[dir] || ''} ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`,
                        `${description[dir] ? description[dir] : `Các lệnh của ${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`}`
                    )
                });

                msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true })
            };
        });

        collector.on('end', async() => {
            msg = await msg.edit({ embeds: [embed], components: [row], fetchReply: true })
        })
    }
}