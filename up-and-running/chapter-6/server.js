'use strict';

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');
var app            = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());


var router = express.Router();

var notes = [
  {id: 1, label: 'First Note', author: 'Shyam'},
  {id: 2, label: 'Second Note', author: 'Brad'},
  {id: 3, label: 'Middle Note', author: 'Someone'},
  {id: 4, label: 'Last Note', author: 'Shyam'},
  {id: 5, label: 'Really the last Note', author: 'Shyam'}

];
var lastId = 6;

router.get('/note', function(req, res) {
  res.send(notes);
});

router.post('/note', function(req, res) {
  var note = req.body;
  note.id = lastId;
  lastId++;
  notes.push(note);
  res.send(note);
});


router.put('/note/:id/done', function(req, res) {
  var noteId = req.params.id;
  var note = null;

  notes.some(function(elem, index) {
    if (noteId === index) {
      note = elem;
      note.label = 'Done - ' + note.label;
      return true;
    }
  });
  res.send(notes);
});

router.get('/note/:id', function(req, res) {
  var noteId = req.params.id;
  notes.some(function(elem, index) {
    if (noteId === index) {
      res.send(elem);
      return true;
    }
  });
  res.send({msg: 'Note not found'}, 404);
});

router.put('/note/:id', function(req, res) {
  var note = req.body;
  var noteId = req.params.id;
  notes.some(function(elem, index) {
    if (noteId === index) {
      elem = note;
      elem.id = noteId;
      res.send(elem);
      return true;
    }
  });
  res.send({msg: 'Note not found'}, 404);
});

router.post('/login', function(req, res) {
  var data = req.body;
  console.log('API LOGIN FOR ', data);
  res.send({msg: 'Login successful for ' + data.username});
});


app.use('/api', router);


app.listen(8000);
console.log('Open http://localhost:8000 to access the files now');
