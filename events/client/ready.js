module.exports = {
    name: "ready",
    async execute(client) {
        console.log(`[!] ${client.user.tag} is now Online!`.red.underline)
        console.log('Made By V8.#6760'.trap.red)
        client.user.setActivity('Project Lucid')
    }
}