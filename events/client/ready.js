module.exports = {
    name: "ready",
    async execute(client) {
        console.log(`[!] ${client.user.tag} is now Online!`.red.underline)
        console.log('Maintained By V8.#6760 & Aidan.#0002'.trap.red)
        client.user.setActivity('Project Lucid')
    }
}