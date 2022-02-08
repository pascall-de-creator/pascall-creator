const express = require('express');
const path = require('path')

var app = express();

//configure view engine
app.set('view engine', 'ejs');

//global constants
const PORT = process.env.PORT || 3000

//middleware
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
  res.render('index', {title: "The astro blog"})
})
//create webpack 404 error page


app.listen(PORT)