const express = require("express");
const db = require("mysql");
const config = require("config");
const app = express();

const dbConfig = config.get("Products.dbConfig");
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const con = db.createConnection(dbConfig);

  con.connect((err) => {
    if (err) throw err;
    console.log("Connnected!");

    var sql = "SELECT * FROM products where special=1";

    con.query(sql, (err, result) => {
      if (err) throw err;

      console.log(result);

      deals = {
        info: result,
      };

      res.render("deals", deals);
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
