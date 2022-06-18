// const fetch = require('node-fetch');

let lol_url = "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json";


'use strict';
var request = require('request');

// var url = 'https://api.github.com/users/rsp';

request.get({
    url: lol_url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, {data}) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      console.log(data);
    //   data.array.forEach(element => {
    //     forEach
    //   });(champion => {
    //     console.log(champion);
    //   });
    }
});
