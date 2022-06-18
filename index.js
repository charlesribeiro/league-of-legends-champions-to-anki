const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const iconv = require("iconv-lite");
// const fs = require('fs');
const request = require('request');

const lol_url = "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json";

function processSingleChampionData(champion){
  console.log(champion);
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

      // const blurb = data[attributename].blurb;
      // const id = data[attributename].id;
      // const { attack, defense, difficulty, magic } = data[attributename].info;
      // const name = data[attributename].name;
      // const partype = data[attributename].partype;

      processSingleChampionData(data[attributename]);
    }
  }
});
