module.exports = {
    name: "loop",
    usage: '!loop',
    description: "Loop the current song",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let loopEmbed = new discord.MessageEmbed()
            .setDescription(`Song has been looped!`)
            .setColor(client.config.loopColor)

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

        if (queue.repeatMode === 0) {
            client.distube.setRepeatMode(message, 1)
            message.channel.send({
                embeds: [loopEmbed]
            })
        } else {
            client.distube.setRepeatMode(message, 0)
            loopEmbed.setDescription(`Song is no longer being looped`)
            message.channel.send({
                embeds: [loopEmbed]
            })
        }

    }
}