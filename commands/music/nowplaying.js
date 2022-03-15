module.exports = {
    name: "nowplaying",
    usage: '!nowplaying',
    description: "View the current song",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        const {
            MessageActionRow,
            MessageButton
        } = require('discord.js')
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

        let noSongEmbed = new discord.MessageEmbed()
            .setTitle(':x: Whoa')
            .setDescription('There isnt another song in the queue')
            .setColor(client.config.embedColor)

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        const NP = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);


        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('previous')
            .setEmoji('◀️')
            .setLabel('Previous')
            .setStyle('PRIMARY')
        )
            .addComponents(
                new MessageButton()
                .setCustomId('Pause')
                .setEmoji('⏸️')
                .setLabel('Pause')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('Play')
                .setStyle('PRIMARY')
                .setEmoji('⏯️')
                .setLabel('Resume')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('skip')
                .setEmoji('⏩')
                .setLabel('Skip')
                .setStyle('PRIMARY')
            )

        const queueMessageEmbed = new discord.MessageEmbed()
            .setTitle('Queue Update')
            .setDescription(`The queue has been paused`)
            .setColor(client.config.embedColor)

        client.on('interactionCreate', async(interaction) => {
            interaction.deferUpdate()
            if (!interaction.isButton()) return;


            const queue = client.distube.getQueue(message)
            if (interaction.customId === 'skip') {
                if(!queue.autoplay && queue.songs.length <= 1 ) {
                    noSongEmbed.setDescription('There isnt a song up next and autoplay isnt on.')
                    return message.channel.send({
                        embeds: [noSongEmbed]
                    })
                } else {
                    await queue.skip()
                }
                

            } else if (interaction.customId === 'previous') {
                if(queue.previousSongs.length < 1) {    
                    noSongEmbed.setDescription('There isnt a previous song')
                    return message.channel.send({
                        embeds: [noSongEmbed]
                    })
                } else {
                   queue.previous();
                }
          
            } else if (interaction.customId === 'Pause') {

                if (queue.paused) {
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
            } else if (interaction.customId === 'Play') {
                if (queue.paused) {
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
        })
        const embed = new discord.MessageEmbed()
            .setAuthor({
                name: queue.songs[0].playing ? "Song Pause..." : "Now Playing..."
            })
            .setColor(client.config.embedColor)
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addField('Uploader:', `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, true)
            .addField('Requester:', `${queue.songs[0].user}`, true)
            .addField('Volume:', `${queue.volume}%`, true)
            .addField('Views', `${queue.songs[0].views}`, true)
            .addField('Likes:', `${queue.songs[0].likes}`, true)
            .addField('Dislikes:', `${queue.songs[0].dislikes}`, true)
            .addField(`Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${NP} ${'─'.repeat(part) + '🎵' + '─'.repeat(30 - part)}\`\`\``)
        message.channel.send({
            embeds: [embed],
            components: [row]
        })

    }
}