module.exports = {
    name: "volume",
    usage: '!volume <precent>',
    description: "Change the volume",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        const volume = parseInt(args[0])

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)
        
            let toHighEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('You may only type 1-100')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })

        if (isNaN(volume)) return message.channel.send({embeds: [toHighEmbed]})
        queue.setVolume(volume)
        let successEmbed = new discord.MessageEmbed()
        .setDescription(`:white_check_mark: Set the volume to ${volume}!`)
        .setColor(client.config.embedColor)
        message.channel.send({embeds: [successEmbed]})
    }
}
