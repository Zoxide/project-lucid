module.exports = {
    name: "pause",
    usage: '!pause',
    description: "Return all commands, or one specific command!",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let pauseEmbed = new discord.MessageEmbed()
            .setDescription('I have paused the song for you')
            .setColor(client.config.embedColor)
        let resumeEmbed = new discord.MessageEmbed()
            .setDescription('I have resumed the song for you')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })

        if(queue.paused) {
            queue.resume()
            return message.channel.send({
                embeds: [resumeEmbed]
            })
        } else {
            queue.pause()
            message.channel.send({
                embeds: [pauseEmbed]
            })
        }
        
    }
}