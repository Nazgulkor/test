const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
require('dotenv').config();
const app = express();
const { Note } = require('./models/index');
const createPath = (page) => path.resolve(__dirname, "views", `${page}.ejs`);
const db = require('./db');
db.connect(process.env.DB_HOST);

app.use(express.static(__dirname + '/styles'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req, res)=>{
    res.render(createPath('index'));
});
app.get('/notes', (req, res) =>{
    Note
        .find()
        .sort({createdAt : -1})
        .then((notes) => {
           return  res.render(createPath('notes'), { notes }) })
});
app.get('/notes/:id', (req,res) => {
    Note
    .findById(req.params.id)
    .then((note) => res.render(createPath('note'), { note }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
})
app.get('/add-user', (req, res) => {
    res.render(createPath('add-user'));
});
app.get('/add-note', (req, res) => {
    res.render(createPath('add-note'));
});

app.post('/add-note', async (req, res) => {
    const { title, text, author,} = await req.body;
    const note = new Note({title : title, text : text, author : author});
    note
    .save()
    .then(result => res.redirect('notes'))
});

app.listen(PORT, () => {
    console.log("listening");
})