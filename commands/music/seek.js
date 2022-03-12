module.exports = {
    name: "seek",
    usage: '!seek <time>',
    description: "Seek for a certain time in a song",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        const time = Number(args[0])

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let noArgsEmbed = new discord.MessageEmbed()
            .setDescription('Please state A time(in seconds) to seek out!')
            .setColor(client.config.embedColor)

        let isnanEmbed = new discord.MessageEmbed()
            .setDescription('Please enter a number!')
            .setColor(client.config.embedColor)

        let successEmbed = new discord.MessageEmbed()
            .setDescription(`Seeked to ${time}`)
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        const wrongVcEmbed = new discord.MessageEmbed()
            .setDescription('You must be in the same voice channel as me.')
            .setColor(client.config.embedColor)

        const {
            channel
        } = message.member.voice
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send({
            embeds: [wrongVcEmbed]
        })
        if (!args[0]) return message.channel.send({
            embeds: [noArgsEmbed]
        })
        if (isNaN(time)) return message.channel.send({
            embeds: [isnanEmbed]
        })
        queue.seek(time)
        message.channel.send({
            embeds: [successEmbed]
        })

    }
}