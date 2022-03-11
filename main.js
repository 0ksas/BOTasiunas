
const Discord = require('discord.js');
const Credentials = require('./Credentials/credentials.js')

const client = new Discord.Client();

const prefix = '!';
const mistakePrefix = 'Ą';
const savePath = './cache/cache.js';
const fs = require('fs');

client.commands = new Discord.Collection();
client.constants = new Discord.Collection();

const messages = new Array();
var heroedUsers = new Array();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const dmCommandFiles = fs.readdirSync('./commands_dm/').filter(file => file.endsWith('.js'));
for (const file of dmCommandFiles) {
    const command = require(`./commands_dm/${file}`);
    client.commands.set(command.name, command);
}

const dialogueConstants = fs.readdirSync('./constants/dialogue').filter(file => file.endsWith('.js'));
for (const file of dialogueConstants) {
    const constant = require(`./constants/dialogue/${file}`);
    client.constants.set(constant.name, constant);
}

client.once('ready', () => {
    try {
        const fs = require('fs');
        if (fs.existsSync(savePath)) {
            let text = fs.readFileSync(savePath);
            if(text.length > 0) heroedUsers = JSON.parse(text)
        } else {
            fs.openSync(savePath, 'w')
        }
    } catch (err) {
        console.error(err)
    }

    console.log('PS bot is online!');
});

client.on('ready', () => {
    client.setInterval(() => {
        let currentTime = new Date();

        heroedUsers.forEach(async function (event) {
            if ((currentTime - Date.parse(event.time)) > 43200000) {

                //Getting the guild from the ID
                let guild
                //This has to be caught and called again because saved and kept in memory lists have different ID names
                try {
                    guild = await client.guilds.fetch(event.member.guildID)
                } catch (err) {
                    guild = await client.guilds.fetch(event.member.guild.id)
                }

                //Getting the members since all of them might not be loaded
                try {
                    let role = guild.roles.cache.find(role => role.name === "Hero of the Village");
                    await guild.members.fetch();

                    //Finding the user object from his ID
                    let user = guild.members.cache.find(user => user.id === event.member.userID)
                    if (user == undefined) user = guild.members.cache.find(user => user.id === event.member.id)

                    //Removing the role
                    user.roles.remove(role.id);
                    let index = heroedUsers.indexOf(event)
                    if (index > -1) {
                        heroedUsers.splice(index, 1)
                    }
                    saveData(savePath, heroedUsers)
                } catch (err) {
                    console.error(err)
                    console.log(guild)
                }

                
            }
        })

        messages.forEach(message => {

            //Removing messages from the list if they are older than 1 hour
            let messageTime = message.createdAt;
            if ((currentTime - messageTime) > 3600000) {
                let index = messages.indexOf(message)
                if (index > -1) {
                    messages.splice(index, 1)
                }
                return;
            }

            //Getting the message reactions
            let reactionsList = message.reactions
            let reactions = reactionsList.cache.find(r => r.emoji.name == "Hero_of_the_Village")
            if (reactions != undefined) {
                try {
                    //Giving the role if 10% of the server has reacted
                    if (reactions.count >= Math.floor(message.guild.memberCount / 10)) {

                        console.log("Heroed of the villaged: " + message.member.displayName)

                        //Finding the role and giving it to the user.
                        let role = message.guild.roles.cache.find(role => role.name === "Hero of the Village")
                        message.member.roles.add(role).catch(console.error)

                        //Removing previous messages to prolong the HOTV role
                        let duplicates = heroedUsers.filter(item => (item.member.userID == message.member.id || item.member.id == message.member.id))

                        duplicates.forEach(item => {
                            let index = heroedUsers.indexOf(item)
                            if (index > -1) {
                                heroedUsers.splice(item, 1);
                            }
                        });

                        //Pushing the user to the list
                        heroedUsers.push({
                            member: message.member,
                            time: currentTime
                        })

                        //Saving the cached data
                        saveData(savePath, heroedUsers)
                        console.log(new Date())

                        //Removing the message from the list
                        let index = messages.indexOf(message)
                        if (index > -1) {
                            messages.splice(index, 1)
                        }
                    }
                } catch (err) {
                    console.error(err)
                }   
            }
        })
    }, 10000)
})

client.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (message.channel.type == "dm" && (message.content.startsWith(prefix) || message.content.startsWith(mistakePrefix))) {
        switch (command) {
            case 'anon':
            case 'anonymous':
                client.commands.get('anon').execute(client, message, args, client);
                break;
            case 'help':
            case 'pagalba':
                client.commands.get('helpDm').execute(client, message, args);
                break;
            case 'useractivity':
                client.commands.get('userActivity').execute(client, message, args);
                break;
            default:
                message.channel.send("Unrecognised message.")
                break;
        }
        return;
    }

    messages.push(message)

    if (message.content.toLowerCase().includes('tikslum') && message.channel.id == 922594491083411576) {
        message.channel.send("Pirmoje užduotyje, tikslumas nėra svarbus.");
    }
    
    if (message.content.startsWith(prefix) || message.content.startsWith(mistakePrefix)) {
        switch (command) {
            case 'ping':
                client.commands.get('ping').execute(client, message, args);
                break;
            case 'help':
            case 'pagalba':
                client.commands.get('help').execute(client, message, args);
                break;
            case 'grupe':
            case 'group':
                client.commands.get('grupė').execute(client, message, args);
                break;
            case 'remove':
            case 'iseiti':
            case 'pasalinti':
                client.commands.get('remove').execute(client, message, args);
                break;
            case 'count':
            case 'kiekis':
                client.commands.get('count').execute(client, message, args);
                break;
            case 'valaitis':
                client.commands.get('valaitis').execute(client, message, args);
                break;
            case 'kasuba':
                client.commands.get('kasuba').execute(client, message, args);
                break;
            case 'litvinas': 
                client.commands.get('litvinas').execute(client, message, args);
                break;
            case 'manifest':
                client.commands.get('manifest').execute(client, message, args);
                break;
            case 'viaceslav':
                client.commands.get('viaceslav').execute(client, message, args);
                break;
            case 'sauliunas':
                client.commands.get('sauliunas').execute(client, message, args);
                break;
            case 'petrauskas':
                client.commands.get('petrauskas').execute(client, message, args);
                break;
            case 'topmessage':
                client.commands.get('topmessage').execute(client, message, args);
                break;
            case 'repo':
            case "git":
            case "source":
                client.commands.get('repo').execute(client, message, args);
                break;
        }
    }
})

client.on('guildMemberAdd', member => {
    console.log(member + " " + member.username + " joined the server.");
    member.send(client.constants.get("privateMessages").welcomeMessage);
})

function saveData(path, array) {
    const fs = require('fs');
    try {
        fs.writeFileSync(path, JSON.stringify(array));
    } catch (err) {
        console.error(err);
    }
}

const credentials = new Credentials();
client.login(credentials.login);