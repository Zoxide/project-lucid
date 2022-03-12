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
        const wrongVcEmbed = new discord.MessageEmbed()
        .setDescription('You must be in the same voice channel as me.')
        .setColor(client.config.embedColor)
    
    const { channel } = message.member.voice
    if(!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send({
        embeds: [wrongVcEmbed]
    })
        const song = queue.previous();
    }
}