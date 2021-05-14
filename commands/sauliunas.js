module.exports = {
    name: 'sauliunas',
    description: "SaUwUliunas",
    execute(message, args) {
        let sauliunasEmoji = message.guild.emojis.cache.find(r => r.name == "mif_Saulinas")

        message.channel.send(`${sauliunasEmoji} As pirma elektronini laiska issiunciau per TelNeta 1996 ${sauliunasEmoji}`, { files: ["./Images/ITT.mp4"] });
    }
}
