module.exports = {
    name: "leave",
    usage: '!leave',
    description: "Have the bot leave the voice channel",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        client.distube.voices.leave(message)
        const successEmbed = new discord.MessageEmbed()
        .setDescription('I left the voice channel')
        .setColor(client.config.embedColor)
        message.channel.send({
            embeds: [successEmbed]
        })
    }
}