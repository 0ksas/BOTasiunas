module.exports = {
    name: 'topmessage',
    description: "finds the most reacted message in a channel",
    async execute(message, args) {
        const fetchAll = require('discord-fetch-all');

        let user = message.member.toString();
        message.channel.send(user + " Counting reactions...");
        const allMessages = await fetchAll.messages(message.channel, {
            userOnly: true, // Only return messages by users
        })

        let topMessage;
        let maxCount = 0;

        allMessages.forEach(m => {
            let reactions = m.reactions.cache.array();
            reactions.forEach(r => {
                if (r.count > maxCount) {
                    maxCount = r.count;
                    topMessage = m;
                }

            });


        });
        message.channel.send(user + " This is the most reacted to message in this channel. With a top unique reaction count of: " + maxCount);
        if (topMessage.pinned) topMessage.unpin({});
        topMessage.pin({ reason: user + 'This is the most reacted to message in this channel' });
        
    }
}