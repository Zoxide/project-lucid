module.exports = {
    name: "serverinfo",
    usage: '!serverinfo',
    description: "View info about your server",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const embed = new discord.MessageEmbed()
        .setAuthor({
            content: message.guild.name
        })
        .addField('Owner', message.guild.owner.user)
        .addField('Member Count', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
        .addField('Created', message.guild.createdAt.toLocaleString(), true)
        .setColor(client.config.embedColor)
        message.channel.send({
            embeds: [embed]
        })
    }
}