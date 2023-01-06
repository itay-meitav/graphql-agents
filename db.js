const mysql = require("mysql2");
const { getCities, getAgents, getLicesens } = require("./data");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "agents",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

async function initialDB() {
  await createInitialTables();
  const [cities, agents, licenses] = await Promise.all([
    getCities(),
    getAgents(),
    getLicesens(),
  ]);
  await insertInitialData(agents, cities, licenses);
}
initialDB();

async function createInitialTables() {
  try {
    await promisePool.query("DROP TABLE IF EXISTS agents, cities, licenses");
    await promisePool.query(
      "CREATE TABLE cities(city_name VARCHAR(200) PRIMARY KEY, city_code INTEGER , sieve TEXT, residents INT, english_name TEXT)"
    );
    await promisePool.query(
      "CREATE TABLE licenses(license_number INTEGER PRIMARY KEY, license_date DATE, rank TEXT)"
    );
    await promisePool.query(
      "CREATE TABLE agents(id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, city VARCHAR(200), FOREIGN KEY(city) REFERENCES cities(city_name) ON DELETE CASCADE, status TEXT, license_number INTEGER, FOREIGN KEY(license_number) REFERENCES licenses(license_number) ON DELETE CASCADE)"
    );
    console.log("done creating/recreateing tables");
  } catch (error) {
    console.log(error.message);
  }
}

async function insertInitialData(agents = [], cities = [], licenses = []) {
  console.log("inserting cities");
  try {
    await Promise.all(
      cities.map((x) => {
        const sql =
          "INSERT INTO cities(city_name, city_code, sieve, residents, english_name) VALUES (?, ?, ?, ?, ?)";
        return promisePool.query(sql, x);
      })
    ).then(() => console.log("done inserting cities"));
    console.log("inserting licenses");
    await Promise.all(
      licenses.map((x) => {
        const sql =
          "INSERT INTO licenses(license_number, license_date, rank) VALUES (?, ?, ?)";
        return promisePool.query(sql, x);
      })
    ).then(() => console.log("done inserting licenses"));
    console.log("inserting agents");
    await Promise.all(
      agents.map((x) => {
        const sql =
          "INSERT INTO agents(first_name, last_name, city, status, license_number) VALUES (?, ?, ?, ?, ?)";
        return promisePool.query(sql, x);
      })
    ).then(() => console.log("done inserting agents"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { insertInitialData, promisePool };
