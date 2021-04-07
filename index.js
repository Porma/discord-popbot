const Discord = require('discord.js');
const client = new Discord.Client();

const timerMin = 300000
const timerMax = 1800000

const guild = ""

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let channels = [];

  // console.log(channels);

  // get all channels of server
  client.guilds.cache.get(guild).channels.cache.forEach(channel => {
    // console.log(channel);

    if (channel.type == 'voice') {
      // console.log(channel.name);
      channels.push(channel);
    }
  });

  console.log('\nAvailable voice channels:');
  channels.forEach(channel => console.log(channel.name));

  // console.log(channels);

  pop(channels);
});

function pop(channels) {
  console.log('');
  console.log((new Date()).toLocaleString());

  let targetChannels = [];

  channels.forEach(channel => {
    if (channel.members.size > 0) {
      targetChannels.push(channel);
    };
  });


  // no one in voice channel : (
  if (targetChannels.length === 0) {
    console.log("No target channels (no members in voice channels)");
  }
  else {
    console.log("Target channels: ");
    targetChannels.forEach(channel => console.log(channel.name));

    // get random channel from targets
    let target = targetChannels[Math.floor(Math.random() * targetChannels.length)];
    console.log("Selected target channel: " + target.name);

    // TODO: make it leave after sound finishes playing
    target.join()
      .then(connection => {
        console.log("P O P");
        connection.play('./pop.wav');
        setTimeout(() => {
          target.leave();
        }, 600);
      });
  }


  let timeout = Math.floor(Math.random() * (timerMax - timerMin) + timerMin)
  let min = Math.floor((timeout / 1000 / 60) << 0);
  let sec = Math.floor((timeout / 1000) % 60);

  console.log(`\nNext pop in ${min} mins and ${sec} seconds`);
  setTimeout(pop, timeout, channels);

}


client.login('');