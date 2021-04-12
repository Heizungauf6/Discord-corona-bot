const Discord = require('discord.js');
const { prefix } = require('../config.json');

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
			.setColor('#25d955')
			.setTitle('Help')
			.addFields(
		{ name: `${prefix}in`, value: `${prefix}in <Stadt> <Landkreis/Stadt>` },
		{ name: `${prefix}add`, value: `Gives you the invite Link for the Bot :)` },
		{ name: `${prefix}heatmap`, value: `Shows Heatmap` },
	); 

	message.channel.send(embed);
  }
  exports.config = {
    aliases: ["help"]
  }