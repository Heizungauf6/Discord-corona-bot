const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { token } = require('./token.json');
const fetch = require('node-fetch');
const { getDistrictByNameAndType } = require("./node_modules/landkreise-deutschland/lib/index");

client.once('ready', () => {
	console.log('Ready!');

	client.user.setStatus('?help');
	client.user.setPresence({ activity: { name: '?help' }, status: 'online' })
});

client.login(token);


client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('message', message => {
	console.log(message.content);
});


client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		const embed = new Discord.MessageEmbed()
			.setColor('#25d955')
			.setTitle('Help')
			.addFields(
		{ name: '?in', value: `?in <Stadt> <Landkreis/Stadt>` },
	);

	message.channel.send(embed);
	} 

	if (command === 'in') {
		if (!args.length) {
			return message.channel.send(`Du hast keinen Landkreis angegeben, ${message.author}!`);
		}

		if (getDistrictByNameAndType(`${args[0]}`, `${args[1]}`) == null)
		{
			return message.channel.send(`Dieser Landkreis existiert nicht, ${message.author}!`);
		}



		const district = getDistrictByNameAndType(`${args[0]}`, `${args[1]}`);
		let getIn = async () => {
			let response = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
			let In = await response.json()
			return In
		}
		let InValue = await getIn()
		someint = InValue.data[`${district.AGS}`].weekIncidence
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(`${district.name}, ${district.type}`)
			.addFields(
		{ name: 'Inzidenz', value:  someint.toFixed(2)},
		{ name: 'Quelle', value: `${InValue.meta.source}` },
		); 

		message.channel.send(embed);
	}
}); 