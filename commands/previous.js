module.exports = {
    name: "previous",
    usage: '!previous',
    description: "Plays the previous song",
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
        const song = queue.previous();
    }
}