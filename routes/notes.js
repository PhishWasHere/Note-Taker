const path = require('path');
const fs = require('fs');
const uniqid = require('../public/assets/js/uniqid.js'); 

// GET Route for retrieving all the notes
module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  //  POST Route for a new note
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    
    // creating body for note
    let userNote = {
      id: uniqid(5),
      title: req.body.title,
      text: req.body.text
    };

    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
  });

  // DELETE Route for a specific note
  app.delete('/api/notes/:id', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    
    let deleteNotes = db.filter((note) => note.id !== req.params.id);
    
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  });
};
