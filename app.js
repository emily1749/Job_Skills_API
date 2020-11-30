const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const mocha = require('mocha');

const jobSkillsDataRoute = require('./routes/jobSkillsData');
const occupationDataRoute = require('./routes/occupationData');

var cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
  })
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('main', { layout: 'index' });
});

const runner = new mocha({});

runner.addFile('./public/test/appTest.js');

runner.run(failures => {
  if (failures) {
    console.error(failures);
  } else {
    console.log('All Passed');
  }
});

app.use('/jobSkillsData', jobSkillsDataRoute);
app.use('/occupationData', occupationDataRoute);
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome To Testing API' });
});

mongoose.connect(
  'mongodb+srv://emily123:emily123@cluster0.ldahv.mongodb.net/jobdataAPI?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
  // () => {
  //   console.log('Connected to database');
  // }
);

PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening to port ${PORT}`));

module.exports = app;
