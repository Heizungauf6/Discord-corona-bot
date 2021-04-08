const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { token } = require('./token.json');
const { reinvite } = require('./token.json');
const fetch = require('node-fetch');
const { getDistrictByNameAndType } = require("./node_modules/landkreise-deutschland/lib/index");

client.once('ready', () => {
	console.log('Ready!');
	client.user.setStatus('Testing');
	client.user.setPresence({ activity: { name: 'Testing' }, status: 'online' })
});

client.login(token);

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		const embed = new Discord.MessageEmbed()
			.setColor('#25d955')
			.setTitle('Help')
			.addFields(
		{ name: `${prefix}in`, value: `${prefix}in <Stadt> <Landkreis/Stadt>` },
		{ name: `${prefix}add`, value: `Gives you the invite Link for the Bot :)` },
	);

	message.channel.send(embed);
	} 

	if(command === 'add') {
		const embed = new Discord.MessageEmbed()
			.setColor('#34ebd8')
			.setTitle(`${prefix}add`)
			.addFields(
		{ name: `Link:`, value: `${reinvite}` },
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
		{ name: 'Quelle', value: `${InValue.meta.source}`})
			.setFooter('📈 Diagram 🚫 Maßnahmen')
			.setTimestamp(); 

		/* message.channel.send(embed).then(sentEmbed => {
			sentEmbed.react("📈")
			sentEmbed.react("🚫")
			
		}) */

		let msg = await message.channel.send(embed);

		await msg.react("📈")
		await msg.react("🚫")


		const filter = (reaction, user) => reaction.emoji.name === "📈" && user.id ===message.author.id;
		const filter1 = (reaction, user) => reaction.emoji.name === "🚫" && user.id ===message.author.id;


		const Diagram = msg.createReactionCollector(filter, {time: 60000, dispose: true});
		const Maßnahmen = msg.createReactionCollector(filter1, {time: 60000, dispose: true});

		Diagram.on("collect", r => {
			embed.setTitle(`${district.type} ${district.name}, Diagram`);
			embed.fields = [];
			embed.setImage('https://media.tenor.com/images/7441e527b2f9334f55310b7c3bcb56a9/tenor.gif')
			msg.edit(embed);
		})

		Maßnahmen.on("collect", r => {
			embed.setTitle(`${district.type} ${district.name}, Maßnahmen`)
			embed.fields = [];
			embed.image = [];
			embed.addFields(
				{ name: 'Maßnahmen: ', value: `Testpflicht für alle Reiserückkehrer per Flugzeug \nBund plant zusätzliche Corona-Hilfen für Firmen  \nMehr Tests für Schüler, Lehrer und Kita-Beschäftigte geplant\nRegelmäßige Testangebote`},
				{ name: 'Quelle: ', value: `ndr.de`}
			)
			msg.edit(embed);
		})




	}
}); 