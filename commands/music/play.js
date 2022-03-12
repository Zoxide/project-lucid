module.exports = {
    name: "play",
    usage: '!play <song>',
    description: "Return all commands, or one specific command!",
    run: async (client, message, args) => {
        const string = args.join(' ')
        const discord = require('discord.js')

        const embed1 = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription(`You must be in a voice channel.`)
            .setColor('#FF0000')

        if (!message.member.voice.channel) return message.channel.send({
            embeds: [embed1]
        })
        const wrongVcEmbed = new discord.MessageEmbed()
        .setDescription('You must be in the same voice channel as me.')
        .setColor(client.config.embedColor)
    
    const { channel } = message.member.voice
    if(!message.guild.me.voice.channel) {
        if (!string) return message.channel.send(`:x: | Please enter a song url or query to search.`)
        client.distube.play(message.member.voice.channel, string, {
            member: message.member,
            textChannel: message.channel,
            message
        })

    } else {
    if(!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send({
        embeds: [wrongVcEmbed]
    })
    }   
 }
}