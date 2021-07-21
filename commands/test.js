module.exports = async (client) =>{
    const guild = client.guilds.cache.get('717142348785516554');
    etInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('717142348785516554');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 5000);

}