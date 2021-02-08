module.exports = {
    name: 'valaitis',
    description: "Generates a random number in the given interval",
    execute(message, args) {
        let user = message.member;
        user = user.toString();

        if (args.length > 2) {
            message.channel.send(user + " Too many arguments.");
            return;
        } else if (args.length == 0) {
            message.channel.send(user + " Please give a range or a maximum number.");
            return;
        } else if (args.length == 1){
            number = parseInt(args[0]);
            console.log(number);
            if (isNaN(number)) {
                    message.channel.send(user + " Please only input numbers.");
                    return;
            }
            message.channel.send(user + " " + Math.round(Math.random() * (number)));
            return;
        }
        
        max = parseInt(args[1]);
        min = parseInt(args[0]);
        if (isNaN(max)||isNaN(min)) {
            message.channel.send(user + " Please only input numbers.");
            return;
        }
        if (min > max) [min, max] = [max, min];
        console.log(min)
        console.log(max)

        message.channel.send(user + " " + Math.round(Math.random() * (max - min) + min));
    }
}