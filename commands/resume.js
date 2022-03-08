module.exports = {
    name: "resume",
    usage: '!resume',
    description: "Resume the queue",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let pauseEmbed = new discord.MessageEmbed()
            .setDescription('I have resumed the song for you')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })

        queue.resume()
        message.channel.send({
            embeds: [pauseEmbed]
        })
    }
}