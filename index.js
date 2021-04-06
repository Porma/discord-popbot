const Discord = require('discord.js');
const client = new Discord.Client();

const timerMin = 5 * 60
const timerMax = 30 * 60

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {

    voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );

    voiceChannel.join()
      .then(connection => {
        connection.play('./pop.wav');
        setTimeout(() => {
          voiceChannel.leave();
        }, 600);
      });

  }
});




client.login('');