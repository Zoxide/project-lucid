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
                if(interaction.customId === 'Volume_Down') {
                    if(queue.volume == 25) {
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
                } else if(interaction.customId === 'Volume_Up') {
                    if(queue.volume == 75) {
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
                } else if(interaction.customId === 'Pause') {
                    
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
                } else if(interaction.customId === 'Play') {
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

