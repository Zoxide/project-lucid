const fs = require('fs');
const colors = require('colors');


const commandLoader = async function(client) {
const commandFolders = fs.readdirSync(`${process.cwd()}/commands`);
for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`${process.cwd()}/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`${process.cwd()}/commands/${folder}/${file}`);

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
}

const eventLoader = async function(client) {
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
}
module.exports = {
    eventLoader,
    commandLoader
}