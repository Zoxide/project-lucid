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
const {
    SpotifyPlugin
} = require('@distube/spotify')
const {
    SoundCloudPlugin
} = require('@distube/soundcloud')
const {
    YtDlpPlugin
} = require('@distube/yt-dlp')
if (!config.prefix) {
    console.log('Please specify a prefix.')
    process.exit(0)
}
if (!config.embedColor) config.embedColor = '#0000FF'
client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.config = require('./config.json')
client.colors = require('colors')
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

//handlers
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
            console.log(`Prefix Command ${file} is being loaded `.yellow)
        } else {
            console.log(`Prefix Command ${file} missing a help.name or help.name is not in string `.red)
            continue;
        }

        if (command.aliases && Array.isArray(command))
            command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
    }
}

const eventFolders = fs.readdirSync(`${process.cwd()}/events`);
for (const folder of eventFolders) {
    const eventFiles = fs
    .readdirSync(`${process.cwd()}/events/${folder}`)
    .filter((file) => file.endsWith(".js"));
    
    for (const file of eventFiles) {
        const event = require(`${process.cwd()}/events/${folder}/${file}`);
        
        if (event.name) {
            console.log(`Event ${file} is being loaded `.cyan)
        } else {
            console.log(`Event ${file} missing a help.name or help.name is not in string `.red);
            continue;
        }
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}


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