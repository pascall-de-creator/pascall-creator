const express = require('express');
const path = require('path');

var app = express();
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, '/')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get("/", (req, res) => {
  res.render('index', {title: "Space station", path: req.route.path})
})
app.get("/blog", (req, res) => {
  if(req.query.page == 1){
    res.render('blog', {title: "The astro blog", path: req.route.path, pageNumber: req.query.page})
  }
  else if(req.query.page > 1) {
    res.render('blog-page', {title: "blog", path: req.route.path, pageNumber: req.query.page })
  }
  else{
    res.render('blog', {title: "The astro blog", path: req.route.path, pageNumber: 1})
  }
})
app.get("/about", (req, res) => {
  res.render('about', {title: "The astronaut", path: req.route.path})
})
app.get("/client-offline-fallback", (req, res) => {
    res.render('fallback', {title: "offline", path: req.route.path})
})
app.get("/create", (req, res) => {
  res.render('create-blog', {title: "Blog editor", path: req.route.path})
})
app.get("/manage", (req, res) => {
  res.render('manage-blogs', {title: "Manage all blogs", path: req.route.path})
})
app.get("/read", (req, res) => {
  res.render('readBlog', {title: "Read astro blog", path: req.route.path})
})
app.get("/search", (req, res) => {
  res.render('search', {title: "Find astro blogs", path: req.route.path})
})
app.use((req, res) => {
  res.status = 404
  res.render('error', {title: "Page not found", path: path, errorCode: res.status, errorMessage: "Hmm.. looks like we cant find this galaxy... we have to go back to the milkyWay" })
})

app.listen(PORT)