module.exports = {
    name: "info",
    usage: '!info',
    description: "View information about this project",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const { MessageActionRow, MessageButton } = require('discord.js');
        const linkRow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setURL('https://discord.gg/luciddev')
            .setLabel('Support Server')
            .setStyle('LINK')
        )
            
            client.on('interactionCreate', interaction => {
              interaction.deferUpdate()
              if (!interaction.isButton()) return;
          });
        const infoEmbed = new discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/attachments/959951576183762994/962179090524291092/black-logo.png')
        .setThumbnail(client.user.avatarURL())
        .setDescription(`**Project Lucid**\n\n**This project is maintained by Lucid Development.**\n
        This project was meant to help users learn the basics of discord bot development whilst providing a functional music bot for your enjoyment.\n
        With this bot being in the beginning stages, you may experience an issue. If thats the case, please contact me in the support server: V8.#6760\n\n**Stats**\nServers:\n${client.guilds.cache.size}`)
        .setColor(client.config.embedColor)
        message.channel.send({
            embeds: [infoEmbed],
            components: [linkRow]
        })

    }
}