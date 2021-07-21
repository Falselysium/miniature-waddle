
module.exports = {
    name: 'clear',
    description: 'clear message',
    execute(message, args){
        if(message.member.hasPermission('ADIMINISTRATOR')) {
            // message.channel.messages.fetch().then((result)=> {
            message.channel.bulkDelete(args[0]);
            message.channel.send(`Bot has deleted ${args[0]} messages`).then(msg => msg.delete({timeout:5000}));
            
        }


    //     message.delete({timeout:5000}).then(msg => console.log(`Deleted message from ${msg.author.username} after 5 seconds`))
    //     .catch(console.error);

    //     message.channel.bulkDelete(args[0]).then(messages => console.log(`Bulk deleted ${messages.size} messages`))
    //     .catch(console.error);
    },
}