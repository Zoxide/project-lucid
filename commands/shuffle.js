module.exports = {
    name: "shuffle",
    usage: '!shuffle',
    description: "shuffle the queue",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let shuffleEmbed = new discord.MessageEmbed()
            .setDescription('Shuffled the current queue')
            .setColor(client.config.embedColor)

     
        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
       queue.shuffle()
       message.channel.send({
        embeds: [shuffleEmbed]
    })
    }
}