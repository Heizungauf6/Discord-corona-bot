const Discord = require('discord.js');
const { prefix } = require('../config.json');
const fetch = require('node-fetch');
const { getDistrictByNameAndType } = require("../node_modules/landkreise-deutschland/lib/index");

exports.run = async(client, message, args) => {

    if (!args.length) {
        return message.channel.send(`Du hast keinen Landkreis angegeben, ${message.author}!`);
    }

    if (getDistrictByNameAndType(`${args[0]}`, `${args[1]}`) == null)
    {
        return message.channel.send(`Dieser Landkreis existiert nicht, ${message.author}!`);
    }



    const district = getDistrictByNameAndType(`${args[0]}`, `${args[1]}`);


    let getWeek = async () => {
        let responseweek = await fetch(`https://api.corona-zahlen.org/districts/${district.AGS}/history/incidence/7`)
        let In = await responseweek.json()
        return In
    
    }


    let InValue2 = await getWeek()

    if (InValue2.data == null) {
      message.channel.send(`Das RKI übermittelt derzeit keine Daten, ${message.author}!`);
      return;
    }

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
      const embed = new Discord.MessageEmbed()
        .setColor('#EFFF00')
        .setTitle(`${district.type} ${district.name}, Diagramm`)
        .setImage(chartUrl)
        .setTimestamp(); 

    let msg = await message.channel.send(embed);

  }
  exports.config = {
    aliases: ["Diagram"]
  }