module.exports = {
    name: 'help',
    description: "Outputs all of the help commands",
    execute(message, args) {
        message.channel.send(
            '!help - see all commands\n' +
            '!grupė [1-5] - pridėti į grupę\n' +
            '!remove - prašyti išėmimo iš grupės.\n' +
            '!count [grupė/rolė] - sužinoti kiek grupėje/rolėje yra vartotojų (palikti tuščią - skaičiuoti viso serverio).\n' + 
            '!valaitis [1-2 skaičiai] - sugeneruoja atsitiktinį skaičių duotame intervale arba nuo 0 iki duoto skaičiaus.'
        )
    }
}