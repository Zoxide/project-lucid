module.exports = {
    name: "queue",
    usage: '!queue',
    description: "View the queue",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const queue = client.distube.getQueue(message)
        const { MessageActionRow, MessageButton } = require('discord.js')
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
                
                
          

        if (!queue) return message.channel.send({
            embeds: [noQueueEmbed]
        })
        const q = queue.songs
        let queueEmbed = new discord.MessageEmbed()
            .setTitle('Current Queue')
            .setDescription(q.map((song, i) => `${i === 0 ? 'Currently Playing:\n' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n'))
            .setColor(client.config.embedColor)



        message.channel.send({
            embeds: [queueEmbed],
            components: [row]
        })
    }
}

