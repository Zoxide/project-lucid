const Discord = require('discord.js')
const {
    DisTube
} = require('distube')
const fs = require('fs')
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
})
const config = require('./config.json')
const handler = require('./handler/main')
const {
    SpotifyPlugin
} = require('@distube/spotify')
const {
    SoundCloudPlugin
} = require('@distube/soundcloud')
const {
    YtDlpPlugin
} = require('@distube/yt-dlp')
var 
JavaScriptObfuscator = require('javascript-obfuscator');
if (!config.prefix) {
    console.log('Please specify a prefix.')
    process.exit(0)
}
if (!config.embedColor) config.embedColor = '#0000FF'
client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.config = require('./config.json')
client.colors = require('colors')
handler.commandLoader(client)
handler.eventLoader(client)
client.distube = new DisTube(client, {
    leaveOnStop: config.leaveOnStop,
    emitNewSongOnly: true,
    leaveOnEmpty: config.leaveOnEmpty,
    leaveOnFinish: config.leaveOnFinish,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
    youtubeDL: false
})

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) => {
        let playSongEmbed = new Discord.MessageEmbed()
            .setTitle('▶️ | Now Playing')
            .addField('Song Name', song.name)
            .addField('Duration', song.formattedDuration)
            .addField('Queued By', `${song.user}\n${status(queue)}`)
            .setColor(config.embedColor)
            queue.textChannel.send({
                embeds: [playSongEmbed]
            })

    })
    .on('addSong', (queue, song) => {
        let addSongEmbed = new Discord.MessageEmbed()
            .setDescription('✅ | Song Added')
            .addField('Song Name', song.name)
            .addField('song Duration', song.formattedDuration)
            .setColor(config.embedColor)
        queue.textChannel.send({
            embeds: [addSongEmbed]
        })
    })
    .on('addList', (queue, playlist) => {

        let addListEmbed = new Discord.MessageEmbed()
            .setTitle('✅ | Playlist Added')
            .addField('Playlist', playlist.name)
            .addField('Total songs', playlist.songs.length)
            .addField('Queue', status(queue))
            .setColor(config.embedColor)
        queue.textChannel.send({
            embeds: [addListEmbed]
        })
    })
    .on('error', (channel, e) => {
        channel.send(`:x: | An error encountered: ${e.toString().slice(0, 1974)}`)
        console.error(e)
    })
    .on('empty', (queue) => {
        queue.textChannel.send('VC Empty, leaving...')
    })
    .on('searchNoResult', (message, query) =>
        message.channel.send(`:x: | No result found for \`${query}\`!`)
    )
    .on('finish', (queue) => {
        let finishedEmbed = new Discord.MessageEmbed()
            .setDescription('The queue has ended!')
            .setColor(config.embedColor)

        queue.textChannel.send({
            embeds: [finishedEmbed]
        })

    })
 
    client.login(config.botToken)