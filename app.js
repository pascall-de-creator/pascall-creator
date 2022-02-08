const express = require('express');
const path = require('path')

var app = express();

//configure view engine
app.set('view engine', 'ejs');

//global constants
const PORT = process.env.PORT || 3000

//middleware
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get("/", (req, res) => {
  res.render('index', {title: "Space station", path: req.route.path})
})

app.get("/blog", (req, res) => {
  res.render('blog', {title: "The astro blog", path: req.route.path})
})

app.get("/about", (req, res) => {
  res.render('about', {title: "The astronaut", path: req.route.path})
})
//create webpack 404 error page


app.listen(PORT)