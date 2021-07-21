const fetch = require('node-fetch');
const config = require('../config.json');
const wotid = config.application_id;


module.exports = {
    name: 'stats',
    description: 'world of tanks stat checker',
    async execute(message, args){
        console.log(args);
        message.channel.send('working');

        if(args[0] === 'wotlab'){
            message.channel.send('https://wotlabs.net/na/player/' + args[1]);
        }
        else if(args[0] === 'tomato.gg'){
            const username = args[1];
            const api_account = `https://api.worldoftanks.com/wot/account/list/?application_id=${wotid}&search=${username}`;

            const response = await fetch(api_account);
            const player = await response.json();
                        
            const player_id = player.data[0]['account_id'];
            message.channel.send(`https://www.tomato.gg/stats/NA/${username}=${player_id}`)
        }

        else{
            message.channel.send('```/stat [tomato.gg, wotlab] [username]```');
        }        
    },
}

// https://wotlabs.net/na/player/freezingblizzard
// https://www.tomato.gg/stats/NA/freezingblizzard=1006536278

// https://api.worldoftanks.com/wot/account/list/?application_id=de5fc5d2679ba4727b40644349d6a908&search=freezingblizzard
//data.account_id

//part1.concat(Part2)