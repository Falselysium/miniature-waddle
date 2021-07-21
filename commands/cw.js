const fetch = require('node-fetch');
const config = require('../config.json');
const wotid = config.application_id;
const api_cw = `https://api.worldoftanks.com/wot/globalmap/clanbattles/?application_id=${wotid}&clan_id=1000043789`;


  module.exports = {
    name: 'cw',
    description: 'Clan Wars Battles',
    execute(message, args) {
      message.channel.send("battles");
      
      async function getCW() {
        const response = await fetch(api_cw);
        const tanks = await response.json();
          for (x in tanks.data) {
          const id = tanks.data[x]['competitor_id'];
          const clanid = `https://api.worldoftanks.com/wot/clans/info/?application_id=de5fc5d2679ba4727b40644349d6a908&clan_id=${id}&fields=tag`;
          const res = await fetch(clanid);
          const cid = await res.json();
          //Map Name  
          const front_id = tanks.data[x]['front_id'];
          const province_id = tanks.data[x]['province_id'];
          const arena_id = `https://api.worldoftanks.com/wot/globalmap/provinces/?application_id=de5fc5d2679ba4727b40644349d6a908&front_id=${front_id}&fields=arena_name&province_id=${province_id}`;
          const response1 = await fetch(arena_id);
          const map_name = await response1.json(); 
          
          // console.log(map_name.data[0]['arena_name']); #to get the First Key:Value in Dictionary Example: [{key:value},{key:value}]
          
          //Time
          const d = new Date(tanks.data[x]['time'] * 1000);
          var currentTime = new Date();
          date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

          //Front Type Basic, Advance, Elite
          
          if (front_id === "renaissance_us_league1"){
            front_type = "Basic"; 
          }
          else if(front_id === "renaissance_us_league2"){
            front_type = "Advance";
          }
          else{
            front_type = "Elite";
          }
          
          const embed = {
            "color": 884390,
            "thumbnail": {
              "url": "https://cdn.discordapp.com/emojis/636365019914960896.png?v=1"
            },
            "fields": [
              {
                "name": 'Clan',
                "value": cid.data[id]['tag'],
                "inline": true
              },
              {
                "name": "Province Name",
                "value": tanks.data[x]['province_name'],
                "inline": true
              },
              {
                "name": 'Map',
                "value": map_name.data[0]['arena_name'],
                "inline": true 
              },
              {
                "name": "Battle Type",
                "value": tanks.data[x]['type'],
                "inline": true
              },
              {
                "name": "Front",
                "value": front_type,
                "inline":true
              },
              {
                "name": 'Time',
                "value": date,
                "inline": true
              }
              
            ]
          };
          if (d > currentTime) {
            message.channel.send({ embed });
          }
          
        }
      }
      getCW();
          // message.delete({timeout:7000}).then(msg => console.log(`Deleted message from ${msg.author.username} after 5 seconds`))
    },
    
  }



//needs front_id, province_id 
//request arena_id = Map name 