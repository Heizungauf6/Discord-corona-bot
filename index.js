const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { token } = require('./token.json');
const fetch = require('node-fetch');

client.once('ready', () => {
	console.log('Ready!');

	client.user.setStatus('?help');
	client.user.setPresence({ activity: { name: '?help' }, status: 'online' })
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
		{ name: '?RegSK', value:  `Gibt Inzidenz von SK Regensburg wieder`},
		{ name: '?RegLK', value: `Gibt Inzidenz von LK Regensburg wieder` },
		{ name: '?Mun', value: `Gibt Inzidenz von SK München wieder` },
		{ name: '?Keh', value: `Gibt Inzidenz von LK Kelheim wieder` },
	);

	message.channel.send(embed);
	} 

	if(command === 'RegSK') {
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

	if(command === 'RegLK') {
		let getIn = async () => {
			let response = await fetch('https://api.corona-zahlen.org/districts/09375')
			let In = await response.json()
			return In
		}
		let InValue = await getIn()
		someint = InValue.data["09375"].weekIncidence
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('LK Regensburg, Bayern')
			.addFields(
		{ name: 'Inzidenz', value:  someint.toFixed(2)},
		{ name: 'Quelle', value: `${InValue.meta.source}` },
	);

	message.channel.send(embed);
	}

	if(command === 'Mun') {
		let getIn = async () => {
			let response = await fetch('https://api.corona-zahlen.org/districts/09162')
			let In = await response.json()
			return In
		}
		let InValue = await getIn()
		someint = InValue.data["09162"].weekIncidence
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('SK München, Bayern')
			.addFields(
		{ name: 'Inzidenz', value:  someint.toFixed(2)},
		{ name: 'Quelle', value: `${InValue.meta.source}` },
	);

	message.channel.send(embed);
	}

	if(command === 'Keh') {
		let getIn = async () => {
			let response = await fetch('https://api.corona-zahlen.org/districts/09273')
			let In = await response.json()
			return In
		}
		let InValue = await getIn()
		someint = InValue.data["09273"].weekIncidence
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('LK Kelheim')
			.addFields(
		{ name: 'Inzidenz', value:  someint.toFixed(2)},
		{ name: 'Quelle', value: `${InValue.meta.source}` },
	);

	message.channel.send(embed);
	}
});