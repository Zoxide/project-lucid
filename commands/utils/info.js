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
            .setURL('https://discord.gg/altmanager')
            .setLabel('Support Server')
            .setStyle('LINK')
        )
            
            client.on('interactionCreate', interaction => {
              interaction.deferUpdate()
              if (!interaction.isButton()) return;
          });
        const infoEmbed = new discord.MessageEmbed()
        .setImage('https://cdn.discordapp.com/avatars/803410753079869491/6cbc06dd2abeda2cc444e292a211f821.webp?size=1024')
        .setThumbnail(client.user.avatarURL())
        .setDescription(`**Project Lucid**\n\n**This project is maintained by Xenon Development Corp.**\n
        This project was meant to help users learn the basics of discord bot development whilst providing a functional music bot for your enjoyment.\n
        With this bot being in the beginning stages, you may experience an issue. If thats the case, please content me in the support server`)
        .setColor(client.config.embedColor)
        message.channel.send({
            embeds: [infoEmbed],
            components: [linkRow]
        })

    }
}