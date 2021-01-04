const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

// const app = express();

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'On the Job Skills page' });
});

router.get('/:city/:state', async (req, res) => {
  let city = req.params.city;
  let state = req.params.state;
  let resultList = [];
  let item = '';
  let resultObj = {};
  var skillsArray = [
    'C%23', //C#
    'C%2B%2B', //C++
    'golang',
    'java',
    'javascript',
    'php',
    'python',
    'ruby',
    'swift',
    'typescript',
  ];

  skillsArray.forEach(async skill => {
    let url =
      'https://www.indeed.com/jobs?q=' + skill + '&l=' + city + '%2C+' + state;

    async function fetchHTML(fetchUrl) {
      const { data } = await axios.get(fetchUrl);
      return cheerio.load(data);
    }
    const $ = await fetchHTML(url);

    $('div[id="searchCountPages"]').each(function(index, element) {
      item = $(element).text();
      item = item.match(/of.{1,}job/);
      item = item[0].replace(',', '').match(/\d{1,}/);
    });

    resultList.push(parseInt(item[0]));
    resultObj[skill] = parseInt(item[0]);

    if (Object.keys(resultObj).length == 10) {
      let result = [];

      for (const [key, value] of Object.entries(resultObj)) {
        if (!value) {
          res.status(401);
          res.send({
            message: 'No data available for input location',
          });
        } else {
          key === 'C%23'
            ? result.push(['C#', value])
            : key === 'typescript'
            ? result.push(['TypeScript', value])
            : key === 'python'
            ? result.push(['Python', value])
            : key === 'golang'
            ? result.push(['Golang', value])
            : key === 'ruby'
            ? result.push(['Ruby', value])
            : key === 'C%2B%2B'
            ? result.push(['C++', value])
            : key === 'php'
            ? result.push(['PHP', value])
            : key === 'swift'
            ? result.push(['Swift', value])
            : key === 'java'
            ? result.push(['Java', value])
            : key === 'javascript'
            ? result.push(['JavaScript', value])
            : null;
        }
      }
      let jsonObj = {};
      for (let i = 0; i < 10; i++) {
        jsonObj[result[i][0]] = result[i][1];
      }
      res.send(jsonObj);
    }
  });
});
module.exports = router;
