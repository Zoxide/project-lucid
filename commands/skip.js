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
        try {
            const song = await queue.skip()
        } catch (e) {
            message.channel.send({embeds: [noSongEmbed]})
        }
    }
}