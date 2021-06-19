const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');

const timerMin = config.timer_min;
const timerMax = config.timer_max;

const soundsDir = './sounds';

const guild = config.guild_id;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let sounds = fs.readdirSync(soundsDir);
  let channels = [];

  // get sound files

  console.log("\nAvailable sound files:");
  // console.log(sounds);

  sounds.forEach(sound => {
    console.log(sound);
  });

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

  pop(channels, sounds);
});

function pop(channels, sounds) {
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

    // get random sound file from sounds
    let sound = sounds[Math.floor(Math.random() * sounds.length)];
    let soundFile = soundsDir + '/' + sound;

    // soundFile = './sounds/pop-bass.opus';

    target.join()
      .then(connection => {
        console.log(`P O P (${sound})`);
        let dispatcher = connection.play(soundFile, { volume: 0.75 });

        // leave voice channel after playing sound
        dispatcher.on('speaking', speaking => {
          if (!speaking) 
            target.leave();
        });
      });
  }


  let timeout = Math.floor(Math.random() * (timerMax - timerMin) + timerMin)
  let min = Math.floor((timeout / 1000 / 60) << 0);
  let sec = Math.floor((timeout / 1000) % 60);

  console.log(`\nNext pop in ${min} mins and ${sec} seconds`);
  setTimeout(pop, timeout, channels, sounds);

}


client.login(config.bot_token);
