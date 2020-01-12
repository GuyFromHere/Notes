const router = require("express").Router();
const fs = require("fs");

// temporarily using this array while I work out the JSON / fs logic...
const notes = [];

router.get("/", () => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/notes.html");
});

router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/api/notes", (req, res) => {
  const notes = fs.readFileSync("./db/db.json");
  let newNote = JSON.parse(notes);
  const data = {
    id: newNote.length + 1,
    title: req.body.title,
    text: req.body.text
  };

  // add new note to notes array
  newNote.push(data);
  fs.writeFile("./db/db.json", JSON.stringify(newNote), () => {
    console.log("wrote back to file");
  });
  // send new note back to DOM for rendering
  res.json(data);
});

router.delete("/api/notes/:id", (req, res) => {
  const selected = req.params.id - 1;
  const newNotes = [];
  notes.splice(selected, 1);
  for (let x = 0; x < notes.length; x++) {
    notes[x].id = x + 1;
    newNotes.push(notes[x]);
  }
  res.json(newNotes);
});

module.exports = router;
