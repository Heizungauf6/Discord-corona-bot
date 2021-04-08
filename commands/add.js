const Discord = require('discord.js');
const { prefix } = require('../config.json');
const { reinvite } = require('../token.json');
exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
			.setColor('#34ebd8')
			.setTitle(`${prefix}add`)
			.addFields(
		{ name: `Link:`, value: `${reinvite}` },
	);

	message.channel.send(embed);
  }
  exports.config = {
    aliases: ["help"]
  }