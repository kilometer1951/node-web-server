const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port =process.env.PORT || 3000 ;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.js');
    }
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});




hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
 res.render('index.hbs', {
   pageTitle:'Home Page',
   welcome:'howdy Home'
 });
});

app.get('/about', (req, res) => {
   res.render('about.hbs',{
     pageTitle:'About Page',
     welcome:'howdy About'
   });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
