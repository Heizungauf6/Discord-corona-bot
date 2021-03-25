const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const fetch = require('node-fetch');

client.once('ready', () => {
	console.log('Ready!');

	client.user.setStatus('?in');
	client.user.setPresence({ activity: { name: '?in' }, status: 'online' })
});

client.login(token);

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
		{ name: '?in', value:  `Gibt Inzidenz von Regensburg wieder`},
		{ name: '?in <Landkreis>', value: `Gibt Inzidinez des angebenen Landkreises an (Funktioniert noch nicht)` },
	);

	message.channel.send(embed);
	} 

	if(command === 'in') {
		let getIn = async () => {
			let response = await fetch('https://api.corona-zahlen.org/districts/09362')
			let In = await response.json()
			return In
		}
		let InValue = await getIn()
		someint = InValue.data["09362"].weekIncidence
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('SK Regensburg, Bayern')
			.addFields(
		{ name: 'Inzidenz', value:  someint.toFixed(2)},
		{ name: 'Quelle', value: `${InValue.meta.source}` },
	);

	message.channel.send(embed);
	}
});