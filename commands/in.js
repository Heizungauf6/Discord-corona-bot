const Discord = require('discord.js');
const { prefix } = require('../config.json');
const fetch = require('node-fetch');
const { getDistrictByNameAndType } = require("../node_modules/landkreise-deutschland/lib/index");

exports.run = async (client, message, args) => {

    if (!args.length) {
        return message.channel.send(`Du hast keinen Landkreis angegeben, ${message.author}!`);
    }

    if (getDistrictByNameAndType(`${args[0]}`, `Stadt`) == null) {
        city = false;
    } else {
        city = true;
    }

    if (getDistrictByNameAndType(`${args[0]}`, `Landkreis`) == null) {
        county = false;
    } else {
        county = true;
    }

    if(city == false && county == false){
        return message.channel.send(`Dieser Landkreis existiert nicht, ${message.author}!`);
    }

    if(city == true && county == false){
        const district = getDistrictByNameAndType(`${args[0]}`, `Stadt`);
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
        .setFooter('📈 Diagram 🚫 Maßnahmen 🗺️ Heatmap')
        .setTimestamp(); 

    let msg = await message.channel.send(embed);

    await msg.react("📈")
    await msg.react("🚫")
    await msg.react("🗺️")


    const filter = (reaction, user) => reaction.emoji.name === "📈" && user.id === message.author.id;
    const filter1 = (reaction, user) => reaction.emoji.name === "🚫" && user.id === message.author.id;
    const filter2 = (reaction, user) => reaction.emoji.name === "🗺️" && user.id === message.author.id;

    const Diagram = msg.createReactionCollector(filter, {time: 60000, dispose: true});
    const Maßnahmen = msg.createReactionCollector(filter1, {time: 60000, dispose: true});
    const Heatmap = msg.createReactionCollector(filter2, {time: 60000, dispose: true});

    Diagram.on("collect", async r => {

        let getToday = async () => {
            let responsetoday = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
            let In = await responsetoday.json()
            return In
        
        }
    
        let getWeek = async () => {
            let responseweek = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}/history/incidence/7`)
            let In = await responseweek.json()
            return In
        
        }

        let InValue = await getToday()
        let InValue2 = await getWeek()
    
        Weekdata = [InValue2.data[`${district.AGS}`].history[0].weekIncidence, InValue2.data[`${district.AGS}`].history[1].weekIncidence, InValue2.data[`${district.AGS}`].history[2].weekIncidence, InValue2.data[`${district.AGS}`].history[3].weekIncidence, InValue2.data[`${district.AGS}`].history[4].weekIncidence, InValue2.data[`${district.AGS}`].history[5].weekIncidence, InValue2.data[`${district.AGS}`].history[6].weekIncidence]
    
        const chart = {
            type: 'bar',
            data: {
              labels: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Heute'],
              datasets: [{
                label: 'Inzidenz',
                data: Weekdata
              }
              ]
            }
          }
    
    
    
          const encodedChart = encodeURIComponent(JSON.stringify(chart));
          const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

            embed.setColor('#EFFF00')
            embed.fields = [];
            embed.image = [];
            embed.setTitle(`${district.type} ${district.name}, Diagramm`)
            embed.setImage(chartUrl)
            embed.setTimestamp(); 
    
            msg.edit(embed);
    })

    Maßnahmen.on("collect", r => {
        embed.setTitle(`${district.type} ${district.name}, Maßnahmen`)
        embed.fields = [];
        embed.image = [];
        embed.addFields(
            { name: 'Maßnahmen: ', value: `Wir werden alle Sterben`},
            { name: 'Quelle: ', value: `ndr.de`}
        )
        msg.edit(embed);
    })

    Heatmap.on("collect", r => {
        embed.setTitle(`Heatmap`);
        embed.fields = [];
        embed.setImage('https://api.corona-zahlen.org/map/districts')
        msg.edit(embed);
    })
    }

    if(city == false && county == true){
        const district = getDistrictByNameAndType(`${args[0]}`, `Landkreis`);
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
        .setFooter('📈 Diagram 🚫 Maßnahmen 🗺️ Heatmap')
        .setTimestamp(); 

    let msg = await message.channel.send(embed);

    await msg.react("📈")
    await msg.react("🚫")
    await msg.react("🗺️")


    const filter = (reaction, user) => reaction.emoji.name === "📈" && user.id === message.author.id;
    const filter1 = (reaction, user) => reaction.emoji.name === "🚫" && user.id === message.author.id;
    const filter2 = (reaction, user) => reaction.emoji.name === "🗺️" && user.id === message.author.id;

    const Diagram = msg.createReactionCollector(filter, {time: 60000, dispose: true});
    const Maßnahmen = msg.createReactionCollector(filter1, {time: 60000, dispose: true});
    const Heatmap = msg.createReactionCollector(filter2, {time: 60000, dispose: true});

    Diagram.on("collect", async r => {

        let getToday = async () => {
            let responsetoday = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
            let In = await responsetoday.json()
            return In
        
        }
    
        let getWeek = async () => {
            let responseweek = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}/history/incidence/7`)
            let In = await responseweek.json()
            return In
        
        }

        let InValue = await getToday()
        let InValue2 = await getWeek()
    
        Weekdata = [InValue2.data[`${district.AGS}`].history[0].weekIncidence, InValue2.data[`${district.AGS}`].history[1].weekIncidence, InValue2.data[`${district.AGS}`].history[2].weekIncidence, InValue2.data[`${district.AGS}`].history[3].weekIncidence, InValue2.data[`${district.AGS}`].history[4].weekIncidence, InValue2.data[`${district.AGS}`].history[5].weekIncidence, InValue2.data[`${district.AGS}`].history[6].weekIncidence]
    
        const chart = {
            type: 'bar',
            data: {
              labels: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Heute'],
              datasets: [{
                label: 'Inzidenz',
                data: Weekdata
              }
              ]
            }
          }
    
    
    
          const encodedChart = encodeURIComponent(JSON.stringify(chart));
          const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

            embed.setColor('#EFFF00')
            embed.fields = [];
            embed.image = [];
            embed.setTitle(`${district.type} ${district.name}, Diagramm`)
            embed.setImage(chartUrl)
            embed.setTimestamp(); 
    
            msg.edit(embed);
    })

    Maßnahmen.on("collect", r => {
        embed.setTitle(`${district.type} ${district.name}, Maßnahmen`)
        embed.fields = [];
        embed.image = [];
        embed.addFields(
            { name: 'Maßnahmen: ', value: `Wir werden alle Sterben`},
            { name: 'Quelle: ', value: `ndr.de`}
        )
        msg.edit(embed);
    })

    Heatmap.on("collect", r => {
        embed.setTitle(`Heatmap`);
        embed.fields = [];
        embed.setImage('https://api.corona-zahlen.org/map/districts')
        msg.edit(embed);
    })
    }

    if (city == true && county == true) {
        const embed = new Discord.MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(`Stadtkreis oder Landkreis?`)
            .addFields(
                { name: 'Stadtkreis', value: `🏙️` },
                { name: 'Landkreis', value: `🏡` })
            .setTimestamp();

        let msg = await message.channel.send(embed);

        await msg.react("🏙️")
        await msg.react("🏡")

        const filterCity = (reaction, user) => reaction.emoji.name === "🏙️" && user.id === message.author.id;
        const filterCounty = (reaction, user) => reaction.emoji.name === "🏡" && user.id === message.author.id;

        const citycheck = msg.createReactionCollector(filterCity, { time: 60000, dispose: true });
        const countycheck = msg.createReactionCollector(filterCounty, { time: 60000, dispose: true });

        citycheck.on("collect", async r => {
            msg.reactions.removeAll();
            const district = getDistrictByNameAndType(`${args[0]}`, `Stadt`);
            let GetCity = async () => {
                let response = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
                let In = await response.json()
                return In
            }
            let InValue = await GetCity()
            someint = InValue.data[`${district.AGS}`].weekIncidence

            embed.fields = [];
            embed.image = [];
            embed.setColor('#EFFF00')
            embed.setTitle(`${district.name}, ${district.type}`)
            embed.addFields(
                { name: 'Inzidenz', value: someint.toFixed(2) },
                { name: 'Quelle', value: `${InValue.meta.source}` })
            embed.setFooter('📈 Diagram 🚫 Maßnahmen 🗺️ Heatmap')
            embed.setTimestamp();

            msg.edit(embed);

            await msg.react("📈")
    await msg.react("🚫")
    await msg.react("🗺️")


    const filter = (reaction, user) => reaction.emoji.name === "📈" && user.id === message.author.id;
    const filter1 = (reaction, user) => reaction.emoji.name === "🚫" && user.id === message.author.id;
    const filter2 = (reaction, user) => reaction.emoji.name === "🗺️" && user.id === message.author.id;

    const Diagram = msg.createReactionCollector(filter, {time: 60000, dispose: true});
    const Maßnahmen = msg.createReactionCollector(filter1, {time: 60000, dispose: true});
    const Heatmap = msg.createReactionCollector(filter2, {time: 60000, dispose: true});

    Diagram.on("collect", async r => {

        let getToday = async () => {
            let responsetoday = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
            let In = await responsetoday.json()
            return In
        
        }
    
        let getWeek = async () => {
            let responseweek = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}/history/incidence/7`)
            let In = await responseweek.json()
            return In
        
        }

        let InValue = await getToday()
        let InValue2 = await getWeek()
    
        Weekdata = [InValue2.data[`${district.AGS}`].history[0].weekIncidence, InValue2.data[`${district.AGS}`].history[1].weekIncidence, InValue2.data[`${district.AGS}`].history[2].weekIncidence, InValue2.data[`${district.AGS}`].history[3].weekIncidence, InValue2.data[`${district.AGS}`].history[4].weekIncidence, InValue2.data[`${district.AGS}`].history[5].weekIncidence, InValue2.data[`${district.AGS}`].history[6].weekIncidence]
    
        const chart = {
            type: 'bar',
            data: {
              labels: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Heute'],
              datasets: [{
                label: 'Inzidenz',
                data: Weekdata
              }
              ]
            }
          }
    
    
    
          const encodedChart = encodeURIComponent(JSON.stringify(chart));
          const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

            embed.setColor('#EFFF00')
            embed.fields = [];
            embed.image = [];
            embed.setTitle(`${district.type} ${district.name}, Diagramm`)
            embed.setImage(chartUrl)
            embed.setTimestamp(); 
    
            msg.edit(embed);
    })

    Maßnahmen.on("collect", r => {
        embed.setTitle(`${district.type} ${district.name}, Maßnahmen`)
        embed.fields = [];
        embed.image = [];
        embed.addFields(
            { name: 'Maßnahmen: ', value: `Wir werden alle Sterben`},
            { name: 'Quelle: ', value: `ndr.de`}
        )
        msg.edit(embed);
    })

    Heatmap.on("collect", r => {
        embed.setTitle(`Heatmap`);
        embed.fields = [];
        embed.setImage('https://api.corona-zahlen.org/map/districts')
        msg.edit(embed);
    })
        })

        countycheck.on("collect", async r => {
            msg.reactions.removeAll();
            const district = getDistrictByNameAndType(`${args[0]}`, `Landkreis`);
            let getIn = async () => {
                let response = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
                let In = await response.json()
                return In
            }
            let InValue = await getIn()
            someint = InValue.data[`${district.AGS}`].weekIncidence

            embed.fields = [];
            embed.image = [];
            embed.setColor('#EFFF00')
            embed.setTitle(`${district.name}, ${district.type}`)
            embed.addFields(
                { name: 'Inzidenz', value: someint.toFixed(2) },
                { name: 'Quelle', value: `${InValue.meta.source}` })
            embed.setFooter('📈 Diagram 🚫 Maßnahmen 🗺️ Heatmap')
            embed.setTimestamp();

            msg.edit(embed);

            await msg.react("📈")
    await msg.react("🚫")
    await msg.react("🗺️")


    const filter = (reaction, user) => reaction.emoji.name === "📈" && user.id === message.author.id;
    const filter1 = (reaction, user) => reaction.emoji.name === "🚫" && user.id === message.author.id;
    const filter2 = (reaction, user) => reaction.emoji.name === "🗺️" && user.id === message.author.id;

    const Diagram = msg.createReactionCollector(filter, {time: 60000, dispose: true});
    const Maßnahmen = msg.createReactionCollector(filter1, {time: 60000, dispose: true});
    const Heatmap = msg.createReactionCollector(filter2, {time: 60000, dispose: true});

    Diagram.on("collect", async r => {

        let getToday = async () => {
            let responsetoday = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}`)
            let In = await responsetoday.json()
            return In
        
        }
    
        let getWeek = async () => {
            let responseweek = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}/history/incidence/7`)
            let In = await responseweek.json()
            return In
        
        }

        let InValue = await getToday()
        let InValue2 = await getWeek()
    
        Weekdata = [InValue2.data[`${district.AGS}`].history[0].weekIncidence, InValue2.data[`${district.AGS}`].history[1].weekIncidence, InValue2.data[`${district.AGS}`].history[2].weekIncidence, InValue2.data[`${district.AGS}`].history[3].weekIncidence, InValue2.data[`${district.AGS}`].history[4].weekIncidence, InValue2.data[`${district.AGS}`].history[5].weekIncidence, InValue2.data[`${district.AGS}`].history[6].weekIncidence]
    
        const chart = {
            type: 'bar',
            data: {
              labels: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Heute'],
              datasets: [{
                label: 'Inzidenz',
                data: Weekdata
              }
              ]
            }
          }
    
    
    
          const encodedChart = encodeURIComponent(JSON.stringify(chart));
          const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

            embed.setColor('#EFFF00')
            embed.fields = [];
            embed.image = [];
            embed.setTitle(`${district.type} ${district.name}, Diagramm`)
            embed.setImage(chartUrl)
            embed.setTimestamp(); 
    
            msg.edit(embed);
    })

    Maßnahmen.on("collect", r => {
        embed.setTitle(`${district.type} ${district.name}, Maßnahmen`)
        embed.fields = [];
        embed.image = [];
        embed.addFields(
            { name: 'Maßnahmen: ', value: `Wir werden alle Sterben`},
            { name: 'Quelle: ', value: `ndr.de`}
        )
        msg.edit(embed);
    })

    Heatmap.on("collect", r => {
        embed.setTitle(`Heatmap`);
        embed.fields = [];
        embed.setImage('https://api.corona-zahlen.org/map/districts')
        msg.edit(embed);
    })

        })


        
    }
    exports.config = {
        aliases: ["intest"]
    }
}