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
      { id: 'blurb', title: 'BLURB' },
      { id: 'id', title: 'ID' },
      { id: 'attack', title: 'ATTACK' },
      { id: 'defense', title: 'DEFENSE' },
      { id: 'difficulty', title: 'DIFFICULTY' },
      { id: 'magic', title: 'MAGIC' },
      { id: 'partype', title: 'PARTYPE' },
      { id: 'tags', title: 'TAGS' },
      { id: 'image', title: 'IMAGE' },
      { id: 'key', title: 'KEY' },
    ]
  });

  csvWriter.writeRecords(championInfo)
    .then(() => {
      console.log('...Done');
    });
}

function processSingleChampionData(champion) {
  const blurb = champion.blurb;
  const id = champion.id;
  const { attack, defense, difficulty, magic } = champion.info;
  const name = champion.name;
  const partype = champion.partype;
  const tags = champion.tags;
  const key = champion.key;
  const image = base_lol_url + image_url + champion.image.full;

  championInfo.push({
    name, blurb, id, attack, defense, difficulty, magic, partype, tags, image, key
  });

  console.log(key);

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
