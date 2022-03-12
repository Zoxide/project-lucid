module.exports = {
    name: "join",
    usage: '!join',
    description: "Have the bot join the voice channel",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const { Constants } = require('discord.js')
       let voiceChannel = message.member.voice.channel

       const noVCEmbed = new discord.MessageEmbed()
       .setDescription(`You must be in a voice channel`)
       .setColor(client.config.embedColor)
        
        if(!voiceChannel) {
            return message.channel.send({
                embeds: [noVCEmbed]
            })
        }
        client.distube.voices.join(voiceChannel)
    }
}