const express = require('express');
const path = require('path');
const axios = require('axios');
var blogFeedData;

const fetchFeed = axios.get('http://localhost:8000/blogs')
  .then(resp => {
    blogFeedData = resp.data
});

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
  if(req.query.page == 1){
    res.render('blog', {title: "The astro blog", path: req.route.path, blogFeedData, pageNumber: req.query.page})
  }
  else if(req.query.page > 1) {
    res.render('blog-page', {title: "more astro blogs", path: req.route.path, blogFeedData, pageNumber: req.query.page })
  }
  else{
    res.render('blog', {title: "The astro blog", path: req.route.path, blogFeedData, pageNumber: 1})
  }
  
})

app.get("/about", (req, res) => {
  res.render('about', {title: "The astronaut", path: req.route.path})
})
//create webpack 404 error page

app.listen(PORT)