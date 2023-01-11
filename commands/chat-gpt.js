module.exports = {
    name: 'question',
    description: "Outputs the count of specified group",
    async execute(client, message, args) {
        let question = "";

        let i = 0;
        args.forEach(element => {
            if (i == 0) {
                question += element
            } else {
                question = question + " " + element
            }
            i++;
        })

        console.log(question)
    }
}