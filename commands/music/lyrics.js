module.exports = {
    name: "lyrics",
    usage: '!lyrics <song>',
    description: "Have the bot send the lyrics",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        const lyricsfinder = require('lyrics-finder')

        let noQueueEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There is nothing playing')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })

        const msgEmbed = new discord.MessageEmbed()
            .setDescription('Searching for lyrics...')
            .setColor(client.config.embedColor)

        const lyricsErrorEmbed = new discord.MessageEmbed()
            .setDescription('Couldn\'t find any lyrics for that song.')
            .setColor(client.config.embedColor)

        let song = args.join(" ")
        let Currentsong = queue.songs[0]
        if (!song && Currentsong) song = Currentsong.name

        let lyrics = null

        try {
            lyrics = await lyricsfinder(song, "")
            if (!lyrics) return message.channel.send({
                embeds: [lyricsErrorEmbed]
            })
        } catch (err) {
            console.log(err)
        }

        const lyricsEmbed = new discord.MessageEmbed()
            .setColor(client.config.embedColor)
            .setTitle('Lyrics')
            .setDescription(`**${song}**\n ${lyrics}`)

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription('Lyrics to long to display')
        }
        message.channel.send({
            embeds: [lyricsEmbed]
        })


    }
}