module.exports = {
    name: 'userActivity',
    description: "Admin command to get activity",
    async execute(client, message, args) {
        const fetchAll = require('discord-fetch-all');
        guildID = args;

        const memberSet = new Map();
        try {
            const guild = client.guilds.cache.find(guild => guild.id == guildID);

            if (guild.ownerID !== message.author.id) {
                message.channel.send(this.constants.notAdmin());
                return;
            }

            const members = await guild.members.fetch();
            members.forEach(member => {
                memberSet.set(member.id, null);
            });

            const channels = guild.channels.cache.array().filter(channel => channel.type == 'text');

            await channels.forEach(async (channel, i) => {
                try {
                    const allMessages = await fetchAll.messages(channel, {
                        userOnly: true
                    });

                    allMessages.forEach((message, j) => {
                        if (memberSet.get(message.author.id) < new Date(message.createdTimestamp)) {
                            memberSet.set(message.author.id, new Date(message.createdTimestamp));
                            console.log(memberSet);
                        }

                        let reactions = message.reactions.cache.array();
                        reactions.forEach(r => {
                            r.users.fetch().then(list => {
                                list.forEach(reactee => {
                                    if (memberSet.get(reactee.id) < new Date(message.createdTimestamp)) {
                                        memberSet.set(reactee.id, new Date(message.createdTimestamp));
                                        console.log(memberSet);
                                    }
                                })
                            })
                            
                        });
                        
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        } catch (e) {
            console.log(e);
            message.channel.send(this.constants.error());
        }
    },

    constants: {
        notAdmin() {
            return "You are not the administrator of the server.";
        },
        error() {
            return "Error calculating. Likely the bot is not in the server";
        }
    }
}