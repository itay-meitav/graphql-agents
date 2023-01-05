const csvtojson = require("csvtojson");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "agents",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

async function insertInitialData() {
  try {
    await promisePool.query("DROP TABLE IF EXISTS agents;");
    await promisePool.query(
      "CREATE TABLE agents(id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, city TEXT, status TEXT, license_number INTEGER, license_date DATE);"
    );
  } catch (error) {
    console.log(error.message);
  }
  csvtojson()
    .fromFile("./agents.csv")
    .then(async (jsonObj) => {
      const values = jsonObj.map((x) => [
        x["שם פרטי"],
        x["שם משפחה"],
        x["ישוב"],
        x["סטטוס"],
        x["מספר רישיון"],
        parseDate(x["תאריך קבלת רישיון"]),
      ]);
      values.forEach(async (x) => {
        try {
          const sql =
            "INSERT INTO agents(first_name, last_name, city, status, license_number, license_date) VALUES (?, ?, ?, ?, ?, ?)";
          await promisePool.query(sql, x);
        } catch (error) {
          console.log(error);
        }
      });
    });
}

function parseDate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

module.exports = { insertInitialData, promisePool };
