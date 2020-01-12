const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// api router
app.use("/", require("./public/routes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
