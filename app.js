const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const date = require(__dirname + "/date.js");
const app = express();
const items = [];
const workItems = [];

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  const day = date.getDay();
  res.render("list", { listTitle: day, newListItem: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
