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

    console.log(InValue2.data[`${district.AGS}`].history);
    console.log(InValue);


  }
  exports.config = {
    aliases: ["Diagram"]
  }