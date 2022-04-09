
module.exports = {
    name: "logger",
    async execute() {
        process.on("unhandledRejection", (reason, p) => {

            console.log(reason, p);
        
        });
        process.on("uncaughtException", (err, origin) => {
        
            console.log("Uncaught Exception/Catch");
            console.log(err, origin)
        
        
        });
        process.on("multipleResolves", (type, promise, reason) => {
        
            console.log(type, promise, reason);
        });
    }
}