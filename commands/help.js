module.exports = {
    name:'help',
    description: 'all commands',
    execute(message, args){
        message.channel.send('https://discord.js.org/#/docs/main/stable/general/welcome');
        // message.channel.send('```/cw```')
        // message.channel.send('```/stats [tomato.gg, wotlab] [username]```')

    },
}