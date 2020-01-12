const router = require("express").Router();
const fs = require("fs");

// temporarily using this array while I work out the JSON / fs logic...
//const notes = [];

router.get("/", () => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/notes.html");
});

router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      res.json(JSON.parse(data));
    } else {
      res.json(true);
    }
  });
});

// Add new note
router.post("/api/notes", (req, res) => {
  // create new array to store notes
  let newNote = [];
  // get notes from db file
  const notes = fs.readFileSync("./db/db.json");
  // if there are old notes, store them in our new array
  if (notes.length > 0) {
    newNote = JSON.parse(notes);
  }
  // create a note object from req data. Create ID for activeNote.
  // Can't equal 0 or renderActiveNote won't see it.
  const data = {
    id: newNote.length + 1,
    title: req.body.title,
    text: req.body.text
  };

  // add new note to array
  newNote.push(data);
  fs.writeFile("./db/db.json", JSON.stringify(newNote), () => {
    console.log("wrote back to file");
  });
  // send note back to DOM for rendering
  res.json(data);
});

router.delete("/api/notes/:id", (req, res) => {
  // get array index of the selected note
  const selected = req.params.id - 1;
  // create new array to store remaining notes
  const newNotes = [];
  // get notes from db file, convert to array, and remove selected index
  let notes = fs.readFileSync("./db/db.json");
  notes = JSON.parse(notes);
  notes.splice(selected, 1);
  // create new array, write back to db, and send result to DOM
  for (let x = 0; x < notes.length; x++) {
    notes[x].id = x + 1;
    newNotes.push(notes[x]);
  }
  fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
    console.log("wrote back to file");
  });
  res.json(newNotes);
});

module.exports = router;
