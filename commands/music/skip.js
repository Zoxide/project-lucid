module.exports = {
    name: "skip",
    usage: '!skip',
    description: "Will skip the current song",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let noSongEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There isnt another song in the queue')
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
        try {
            const song = await queue.skip()
        } catch (e) {
            message.channel.send({
                embeds: [noSongEmbed]
            })
        }
    }
}