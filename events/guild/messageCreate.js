module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot || !message.guild) return
    const prefix = client.config.prefix
    if (!message.content.startsWith(prefix)) return
    console.log(`${message.author.tag} ran the command ${message.content}`.grey)

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel && client.member.voice.channel !== message.member.voice.channel) {
        return message.channel.send(`:x: | You must be in a voice channel!`)
    }
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.channel.send(`:x: | Error: \`${e}\``)
    }
    }
}