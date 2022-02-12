module.exports = {
    name: 'topmessage',
    description: "finds the most reacted message in a channel",
    async execute(client, message, args) {
        const fetchAll = require('discord-fetch-all');

        let user = message.member.toString();
        message.channel.send(this.constants.counting(user));

        try {
            const allMessages = await fetchAll.messages(message.channel, {
                userOnly: true,
            })

            let topMessage;
            let maxCount = 0;

            allMessages.forEach(m => {
                //TODO: rework so that it counts unique users reacted, not unique reactions.
                let reactions = m.reactions.cache.array();
                reactions.forEach(r => {
                    if (r.count > maxCount) {
                        maxCount = r.count;
                        topMessage = m;
                    }
                });
            });

            message.channel.send(this.constants.success(user, maxCount, this.constants.messageUrl(topMessage)));
        } catch (error) {
            console.log(error.message);
            message.channel.send(this.constants.failure(user));
        }
    },

    constants: {
        counting(user) {
            return `${user} Counting reactions...`;
        },
        success(user, count, url) {
            return `${user}, this is the most reacted to message in this channel. With a top unique reaction count of: ${count}. ${url}`;
        },
        failure(user) {
            return `${user}, there was an error in trying to count reactions.`;
        },
        messageUrl(message) {
            return `https://discord.com/channels/${message.channel.guild.id}/${message.channel.id}/${message.id}`;
        }
    }
}