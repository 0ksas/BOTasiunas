module.exports = {
    name: 'valaitis',
    description: "Generates a random number in the given interval",
    execute(client, message, args) {
        let user = message.member;
        user = user.toString();

        if (args.length > 2) {
            message.channel.send(this.constants.tooManyArguments(user));
            return;
        } else if (args.length == 0) {
            message.channel.send(this.constants.provideRange(user));
            return;
        } else if (args.length == 1){
            number = parseInt(args[0]);

            if (isNaN(number)) {
                message.channel.send(this.constants.onlyNumbers(user));
                return;
            }
            message.channel.send(user + " " + Math.round(Math.random() * (number)));
            return;
        }
        
        max = parseInt(args[1]);
        min = parseInt(args[0]);
        if (isNaN(max) || isNaN(min)) {
            message.channel.send(this.constants.onlyNumbers(user));
            return;
        }
        if (min > max) {
            [min, max] = [max, min];
        }

        message.channel.send(user + " " + Math.round(Math.random() * (max - min) + min));
    },

    constants: {
        tooManyArguments(user) {
            return `${user}, too many arguments.`;
        },
        provideRange(user) {
            return `${user}, provide a range or a maximum number.`;
        },
        onlyNumbers(user) {
            return `${user}, please only input numbers.`
        }
    }
}