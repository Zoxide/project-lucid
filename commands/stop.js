module.exports = {
    name: "stop",
    usage: '!stop',
    description: "Stop the music",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        queue.stop()
        let successEmbed = new discord.MessageEmbed()
        .setDescription(`Stopped!`)
        .setColor(client.config.embedColor)
        message.channel.send({embeds: [successEmbed]})
    }
}