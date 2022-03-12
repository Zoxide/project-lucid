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

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        const NP = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('Volume_Down')
                .setEmoji('🔈')
                .setLabel('Volume Down')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('Volume_Up')
                .setEmoji('🔊')
                .setLabel('Volume Up')
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
                .setEmoji('⏯️')
                .setLabel('Play')
                .setStyle('PRIMARY')
            )

        const queueMessageEmbed = new discord.MessageEmbed()
            .setTitle('Queue Update')
            .setDescription(`The queue has been paused`)
            .setColor(client.config.embedColor)

        client.on('interactionCreate', interaction => {
            interaction.deferUpdate()
            if (!interaction.isButton()) return;


            const queue = client.distube.getQueue(message)
            if (interaction.customId === 'Volume_Down') {
                if (queue.volume == 25) {
                    return queueMessageEmbed.setDescription(`Volume is already at 25`)
                    message.channel.send({
                        embeds: [queueMessageEmbed]
                    })
                }
                queue.setVolume(25)
                queueMessageEmbed.setDescription(`Volume was set to 25`)
                message.channel.send({
                    embeds: [queueMessageEmbed]
                })
            } else if (interaction.customId === 'Volume_Up') {
                if (queue.volume == 75) {
                    queueMessageEmbed.setDescription(`Volume is already at 75`)
                    return message.channel.send({
                        embeds: [queueMessageEmbed]
                    })
                }
                queue.setVolume(75)
                queueMessageEmbed.setDescription(`Set the volume to 75`)
                message.channel.send({
                    embeds: [queueMessageEmbed]
                })
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