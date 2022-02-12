module.exports = {
    name: 'anon',
    description: "A command to send anonymous messages in a server",
    async execute(message, args, client) {
        try {
            const serverID = args.shift();
            var channelName = "";

            const server = client.guilds.cache.find(guild => guild.id == serverID);
            var guild = client.guilds.cache.find(guild => guild.name == "PS'ai");

            if (server) {
                guild = await client.guilds.fetch(serverID).catch(err => console.error(err))
            } else {
                channelName = serverID;
            }
            await guild.members.fetch();
            if (guild.members.cache.find(user => user.id == message.author.id)) {
                const channel = guild.channels.cache.find(channel => channel.name == channelName);
                let content = "";

                let i = 0;
                args.forEach(element => {
                    if (i == 0) content += element
                    else {
                        content = content + " " + element
                    }
                    i++;
                })
                channel.send("**[Anonymous message]**\n" + content);
            } else {
                message.channel.send(this.constants.doesNotBelongToServer());
            }

        } catch (err) {
            console.error(err)
            console.error(`${args}`)
            message.channel.send(this.constants.messageError());
        }
    },

    constants: {
        doesNotBelongToServer() {
            return "You do not belong to the server.";
        },
        messageError() {
            return "Something went wrong, make sure you formatted the message correctly and input the right information.\n" +
                "For more information type '!help'";
        }
    }
}