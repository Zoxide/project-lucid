module.exports = {
    name: "jump",
    usage: '!jump <#>',
    description: "Jump to a specific song in the queue",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        const {
            channel
        } = message.member.voice

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        let shuffleEmbed = new discord.MessageEmbed()
            .setDescription(`Jumped to ${args}`)
            .setColor(client.config.embedColor)

        let noArgsEmbed = new discord.MessageEmbed()
            .setDescription('Please State A Number To Jump To')
            .setColor(client.config.embedColor)

        let wrongVcEmbed = new discord.MessageEmbed()
            .setDescription('You must be in the same voice channel as me.')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        
        if(!args) return message.channel.send({embeds: [noArgsEmbed]})


        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send({
            embeds: [wrongVcEmbed]
        })
        
        client.distube.jump(message, parseInt(args))
        .catch(err => message.channel.send("Invalid Song #"))
        
        message.channel.send({
            embeds: [shuffleEmbed]
        })
    }
}