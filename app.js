const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const date = require(__dirname + "/date.js");
const app = express();
const mysql = require('mysql');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ajbarton_todo-list', 'ajbarton_admin', 'Abcdefg12', {
  host: 'austinbarton.dev',
  dialect: 'mysql'
});

const itemSchema = sequelize.define("items", {
  name: {
    type: DataTypes.STRING
  }
});

sequelize.sync();

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
  if (req.body.list === "Work List") {
    if (item === "") {
      console.log("whoops");
    } else {
      workItems.push(item);
      res.redirect("/work");
    }
  } else {
    if (item === "") {
      console.log("whoops");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000.");
});