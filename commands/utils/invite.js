const { MessageActionRow, MessageButton } = require('discord.js');
const linkRow = new MessageActionRow()
module.exports = {
    name: "invite",
    usage: '!invite',
    description: "Invite this bot to your server!",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const linkRow = new MessageActionRow()
            .addComponents(
                 new MessageButton()
                 .setURL('https://discord.com/api/oauth2/authorize?client_id=850513180937158666&permissions=8&scope=bot%20applications.commands')
                 .setLabel('Invite')
                 .setStyle('LINK')
)

            client.on('interactionCreate', interaction => {
            interaction.deferUpdate()
                if (!interaction.isButton()) return;
            })
            const inviteEmbed = new discord.MessageEmbed()
            .setTitle('Invite Me!')
            .setDescription('Want me to take part in your everlasting server? Well press the button down below to get started!')
            .setColor(client.config.embedColor)
            message.channel.send({
                embeds: [inviteEmbed],
                components: [linkRow]
            })
    }
}


