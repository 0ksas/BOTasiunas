module.exports = {
    name: 'count',
    description: "Outputs the count of specified group",
    execute(message, args) {
        let user = message.member;
        user = user.toString();
        let roleName = "";
        
        let i = 0;
        args.forEach(element => {
            if (i == 0) roleName += element
            else {
                roleName = roleName + " " + element
            }
                i++;
        })
        //let roleObject = message.guild.roles.cache.find(role => role.name === groupName)
        let roleId = message.guild.roles.cache.find(role => role.name === roleName);
        //if (roleId === undefined) {
          //  message.channel.send(user + " No such group exists.")
            //return;
        //}

        if (args.length == 0) {
            message.channel.send(user + " Count of users in the server: " + message.guild.memberCount);
        } else if (roleId) {
                        //message.member.roles.cache.find(role => role.name === (i + " grupe"))
                    let c = 0;
                    //console.log(roleId);
                    let count = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === roleName));
                    //let count = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === roleName)).size;
                    message.guild.members.cache.map(m =>{
                        if(m.name == roleName) {
                            c++
                        }
                    
                    });
                    //console.log(count);
                    console.log(count)
                    console.log("role count: " + c)
                    //message.channel.send(user + " Count of users in " + roleName + ": "+count)
                    
        }       else {
                    message.channel.send(user + " No such role found.");
                     }
        
    }
}