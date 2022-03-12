module.exports = {
    name: "help",
    usage: '!help <command>',
    description: "Return all commands, or one specific command!",
    run: async (client, message, args) => {
        const discord = require('discord.js')
        const fs = require('fs')
        const { MessageActionRow, MessageButton } = require('discord.js');
        if (!args[0]) {
         
            const musicCommandsList = [];
            fs.readdirSync(`${process.cwd()}/commands/music`).forEach((file) => {
                const filen = require(`${process.cwd()}/commands/music/${file}`);
                const name = `\`${filen.name}\``
                musicCommandsList.push(name);
            });
            // const modCommandsList = [];
            // fs.readdirSync(`${process.cwd()}/commands/mod`).forEach((file) => {
            //   const filen = require(`${process.cwd()}/commands/mod/${file}`);
            //   const name = `\`${filen.name}\``
            //   modCommandsList.push(name);
            // });

            const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
              .setLabel('Discord')
              .setStyle('LINK')
              .setURL('https://discord.gg/altmanager')
            )
            
            client.on('interactionCreate', interaction => {
              interaction.deferUpdate()
              if (!interaction.isButton()) return;
          });

            const helpEmbed = new discord.MessageEmbed()
                .setTitle(`${client.user.username} Help`)
                .addField("🎵  - Music Commands", musicCommandsList.map((data) => `${data}`).join(", "), true)
                // .addField("🤖 - Moderator Commands", modCommandsList.map((data) => `${data}`).join(', '), true)
                .setColor(client.config.embedColor)
            message.channel.send({
                embeds: [helpEmbed],
                components: [row]
            })
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            if (!command) {
                message.reply({content: `There isn't any command named "${args[0]}"`, allowedMentions: {repliedUser: false}});
              } else {
                let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let aliases = command.aliases || "No aliases provided"

        
                let helpCmdEmbed = new discord.MessageEmbed()
                  .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` Command`)
                  .addField('Description', description)
                  .addField('Usage', usage)
                  .setColor(client.config.embedColor)
                
            
                message.reply({embeds: [helpCmdEmbed], allowedMentions: {repliedUser: false}});
              }

        }
    }
}
