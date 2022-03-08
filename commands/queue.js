module.exports = {
    name: "queue",
    usage: '!queue',
    description: "View the queue",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        const q = queue.songs

        let queueEmbed = new discord.MessageEmbed()
            .setTitle('Current Queue')
            .setDescription(q.map((song, i) => `${i === 0 ? 'Currently Playing:\n' : `${i}. Up Next:`} ${song.name} - \`${song.formattedDuration}\``).join('\n'))
            .setColor(client.config.embedColor)

        message.channel.send({
            embeds: [queueEmbed]
        })
    }
}