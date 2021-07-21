const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token, application_id} = require('./config.json');
const client = new Discord.Client();
const fetch = require('node-fetch');
const wotid = application_id;
client.commands = new Discord.Collection();

const api_cp = `https://api.worldoftanks.com/wot/globalmap/clanprovinces/?application_id=${wotid}&clan_id=1000043789`;


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () =>{
    console.log('Tankbot Online')
});

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    
    if (!client.commands.has(command)) return;

    try{
        client.commands.get(`${command}`).execute(message, args);
    }
    catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!'); 
    }
  
});

client.login(token);

