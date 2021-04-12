const Discord = require('discord.js');
const { prefix } = require('../config.json');
const fetch = require('node-fetch');

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
			.setColor('#34ebd8')
			.setTitle(`Heatmap`)
            .setImage('https://api.corona-zahlen.org/map/districts')

	message.channel.send(embed);
  }
  exports.config = {
    aliases: ["heatmap"]
  }