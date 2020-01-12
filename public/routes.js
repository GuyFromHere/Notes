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
  /* fs.readFile("./js/db.json", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  }); */
  res.json(notes);
});

router.post("/api/notes", (req, res) => {
  const data = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text
  };
  // add new note to notes array
  notes.push(data);
  // write notes array to db.json file
  /* fs.writeFile("./db.json", notes, () => {
    console.log("write notes to file");
  }); */
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
