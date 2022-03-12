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
        const wrongVcEmbed = new discord.MessageEmbed()
        .setDescription('You must be in the same voice channel as me.')
        .setColor(client.config.embedColor)
    
    const { channel } = message.member.voice
    if(!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send({
        embeds: [wrongVcEmbed]
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