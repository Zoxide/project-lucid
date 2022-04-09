module.exports = {
    name: "remove",
    usage: '!remove <number>',
    description: "Remove a song from the queue",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const discord = require('discord.js')
        const time = Number(args[0])

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let isnanEmbed = new discord.MessageEmbed()
            .setDescription('Please enter a number!')
            .setColor(client.config.embedColor)

        let removedEmbed = new discord.MessageEmbed()
        .setDescription(`I have removed ${time} from the queue!`)
        .setColor(client.config.embedColor)
        
        
            if (!queue) return message.channel.send({
                embeds: [noQueueEmbed]
            })
            if (isNaN(time)) return message.channel.send({
                embeds: [isnanEmbed]
            })

            queue.remove(time)
            message.channel.send({
                embeds: [removedEmbed]
            })
        
    }
}