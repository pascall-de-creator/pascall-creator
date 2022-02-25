const express = require('express');
const path = require('path');
const axios = require('axios');
var blogFeedData;
var topBlogFeedData;
var newBlogFeedData;

const fetchFeed_all = axios.get('http://localhost:8000/all?_sort="date_published"&_order="dec"')
  .then(resp => {
    blogFeedData = resp.data
});
const fetchFeed_top = axios.get('http://localhost:8000/all?_sort="reactions"&_order="dec"')
  .then(resp => {
    topBlogFeedData = resp.data
});
const fetchFeed_new = axios.get('http://localhost:8000/all?_sort="date_published"&_order="dec"')
  .then(resp => {
    newBlogFeedData = resp.data
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
    res.render('blog', {title: "The astro blog", path: req.route.path, blogFeedData, newBlogFeedData, topBlogFeedData, pageNumber: req.query.page})
  }
  else if(req.query.page > 1) {
    res.render('blog-page', {title: "blog", path: req.route.path, blogFeedData, newBlogFeedData, topBlogFeedData, pageNumber: req.query.page })
  }
  else{
    res.render('blog', {title: "The astro blog", path: req.route.path, blogFeedData, newBlogFeedData, topBlogFeedData, pageNumber: 1})
  }
})

app.get("/about", (req, res) => {
  res.render('about', {title: "The astronaut", path: req.route.path})
})
//create 404 error page
app.use((req, res) => {
  res.status = 404
  res.render('error', {title: "Page not found", path: path, errorCode: res.status, errorMessage: "Oops..Looks like we are in a different galaxy... can't find this page" })
})

app.listen(PORT)