module.exports = {
    name: "help",
    usage: '!help <command>',
    description: "Return all commands, or one specific command!",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const fs = require('fs')
        if (!args[0]) {

            const botCommandsList = [];
            fs.readdirSync(`./commands/`).forEach((file) => {
                const filen = require(`../commands/${file}`);
                const name = `\`${filen.name}\``
                botCommandsList.push(name);
            });

            const helpEmbed = new discord.MessageEmbed()
                .setTitle(`${client.user.username} Help`)
                .addField("🤖 - Bot Commands", botCommandsList.map((data) => `${data}`).join(", "), true)
                .setColor(client.config.embedColor)
            message.channel.send({
                embeds: [helpEmbed]
            })
        }
    }
}