 module.exports = {
    name: 'kasuba',
    description: "Ka�UwUba",
     execute(client, message, args) {
         message.channel.send(this.constants.link(), { files: ["./Images/kasuba.jpg"] });
    },

    constants: {
        link() {
            return ':heart: http://www.xn--kauba-wdb.lt/ :heart:'
        }
    }
}