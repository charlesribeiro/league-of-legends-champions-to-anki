const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const request = require('request');
const env = require('./environment.js');

const base_lol_url = env.base_lol_url;
const lol_url = env.base_lol_url + env.champion_json_url;
const image_url = env.image_url;
const file_path = env.file_path;

let championInfo = [];

function writeChampionInfoToCSV() {
  const csvWriter = createCsvWriter({
    path: process.cwd() + file_path,
    header: [
      { id: 'name', title: 'NAME' },
      { id: 'title', title: 'TITLE' },
      { id: 'blurb', title: 'BLURB' },
      { id: 'id', title: 'ID' },
      { id: 'attack', title: 'ATTACK' },
      { id: 'defense', title: 'DEFENSE' },
      { id: 'difficulty', title: 'DIFFICULTY' },
      { id: 'magic', title: 'MAGIC' },
      { id: 'partype', title: 'PARTYPE' },
      { id: 'tags', title: 'TAGS' },
      { id: 'image', title: 'IMAGE' },
      { id: 'attackrange', title: 'ATTACK_RANGE' },
      { id: 'key', title: 'KEY' },
    ]
  });

  csvWriter.writeRecords(championInfo)
    .then(() => {
      console.log('...done writing csv');
    });
}

function processSingleChampionData(champion) {
  const { attack, defense, difficulty, magic } = champion.info;
  const { blurb , id, name, partype, tags, key, title} = champion;
  const image = base_lol_url + image_url + champion.image.full;
  const { 
    hp,
    hpperlevel,
    mp,
    mpperlevel,
    movespeed,
    armor,
    armorperlevel,
    spellblock,
    spellblockperlevel,
    attackrange,
    hpregen,
    hpregenperlevel,
    mpregen,
    mpregenperlevel, 
    crit,
    critperlevel,
    attackdamage,
    attackdamageperlevel,
    attackspeedoffset,
    attackspeedperlevel,
  } = champion.stats;

  championInfo.push({
    name, title, blurb, id, attack, defense, difficulty, magic, partype, tags, image, attackrange, key
  });
  if (key == 143) {
    writeChampionInfoToCSV();
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
    console.log(data);

    for (var attributename in data) {
      // console.log(attributename + ": " + data[attributename].title);
      processSingleChampionData(data[attributename]);
    }
  }
});
