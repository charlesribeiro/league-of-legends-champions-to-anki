const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const iconv = require("iconv-lite");
// const fs = require('fs');
const request = require('request');

const lol_url = "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json";

let championInfo = [];

function processSingleChampionData(champion) {
  const blurb = champion.blurb;
  const id = champion.id;
  const { attack, defense, difficulty, magic } = champion.info;
  const name = champion.name;
  const partype = champion.partype;
  const tags = champion.tags;
  const key = champion.key;

  championInfo.push({
    blurb, id, attack, defense, difficulty, magic, name, partype, tags
  });

  console.log(key);

  if(key == 143){
    console.log("foi...");
  }
}

request.get({
  url: lol_url,
  json: true,
  headers: { 'User-Agent': 'request' }
}, (err, res, { data }) => {
  if (err) {
    console.log('Error:', err);
  } else if (res.statusCode !== 200) {
    console.log('Status:', res.statusCode);
  } else {
    // console.log(data);

    for (var attributename in data) {
      // console.log(attributename + ": " + data[attributename].title);
      processSingleChampionData(data[attributename]);
    }
  }
});
