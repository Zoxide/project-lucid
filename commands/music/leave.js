module.exports = {
    name: "leave",
    usage: '!leave',
    description: "Have the bot leave the voice channel",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const successEmbed = new discord.MessageEmbed()
        .setDescription('I left the voice channel')
        .setColor(client.config.embedColor)

        const wrongVcEmbed = new discord.MessageEmbed()
        .setDescription('You must be in the same voice channel as me.')
        .setColor(client.config.embedColor)
    
    const { channel } = message.member.voice
    if(!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send({
        embeds: [wrongVcEmbed]
    })
    client.distube.voices.leave(message)
    message.channel.send({
        embeds: [successEmbed]
    })
    }
}