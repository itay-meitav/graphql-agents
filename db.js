const csvtojson = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const filePath = __dirname + "/agents.db";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "");
}

const db = new sqlite3.Database(__dirname + "/agents.db", (err) => {
  if (err) {
    console.log(err);
  }
});

function insertInitialData() {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS agents");
    db.run(
      "CREATE TABLE agents (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, city TEXT, status TEXT, license_number INTEGER, license_date DATE)"
    );
  });
  csvtojson()
    .fromFile("./agents.csv")
    .then((jsonObj) => {
      const fixed = jsonObj.map((x) => {
        return {
          firstName: x["שם פרטי"],
          lastName: x["שם משפחה"],
          city: x["ישוב"],
          status: x["סטטוס"],
          licenseNumber: x["מספר רישיון"],
          licenseDate: parseDate(x["תאריך קבלת רישיון"]),
        };
      });
      try {
        db.serialize(() => {
          const stmt = db.prepare(
            "INSERT INTO agents (first_name, last_name, city, status, license_number, license_date) VALUES (?, ?, ?, ?, ?, ?)"
          );
          fixed.forEach((x) =>
            stmt.run(
              x.firstName,
              x.lastName,
              x.city,
              x.status,
              x.licenseNumber,
              x.licenseDate
            )
          );
          stmt.finalize();
        });
      } catch (error) {
        console.log(error);
      }
    });
}

function parseDate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

module.exports = { db, insertInitialData };
