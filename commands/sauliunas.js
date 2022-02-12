module.exports = {
    name: 'sauliunas',
    description: "SaUwUliunas",
    execute(client, message, args) {
        let sauliunasEmoji = message.guild.emojis.cache.find(r => r.name == "mif_Saulinas")

        message.channel.send(this.constants.message(sauliunasEmoji), { files: ["./Images/ITT.mp4"] });
    },

    constants: {
        message(emoji) {
            return `${emoji} As pirma elektronini laiska issiunciau per TelNeta 1996 ${emoji}`;
        }
    }
}
