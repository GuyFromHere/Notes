const router = require("express").Router();

const notes = [];

router.get("/", () => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/notes.html");
  //res.sendFile("/notes.html");
});

router.get("/api/notes", (req, res) => {
  res.json(notes);
});

//////////////////////////////////////////
// Post
///////////////////////////////////////////
router.post("/api/notes", (req, res) => {
  // res.redirect("/notes");
  //console.log(req.body);
  const data = {
    title: req.body.title,
    text: req.body.text
  };
  notes.push(data);
  console.log(notes);
  res.json(data);
});

router.post("/deleteNote/:id", (req, res) => {});

module.exports = router;
