const mysql = require("mysql2");
const { getCities, getAgents, getLicesens, getCars } = require("./data");

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
  const [cities, licenses, cars, agents] = await Promise.all([
    getCities(),
    getLicesens(),
    getCars(),
    getAgents(),
  ]);
  await insertInitialData(agents, cities, licenses, cars);
}
initialDB();

async function createInitialTables() {
  try {
    await promisePool.query(
      "DROP TABLE IF EXISTS agents, cities, licenses, cars CASCADE"
    );
    await promisePool.query(
      "CREATE TABLE cities(city_name VARCHAR(200) PRIMARY KEY, city_code INT, sieve TEXT,\
       residents INT, english_name TEXT)"
    );
    await promisePool.query(
      "CREATE TABLE licenses(license_number INT PRIMARY KEY, license_date DATE, rank TEXT)"
    );
    await promisePool.query(
      "CREATE TABLE cars(car_number VARCHAR(200) PRIMARY KEY, production_year INT, manufacturer TEXT,\
       manufacturing_country TEXT, fuel_type TEXT, rank TEXT)"
    );
    await promisePool.query(
      "CREATE TABLE agents(id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, city VARCHAR(200),\
       FOREIGN KEY(city) REFERENCES cities(city_name) ON UPDATE CASCADE, status TEXT,\
       license_number INT, FOREIGN KEY(license_number) REFERENCES licenses(license_number) ON UPDATE CASCADE,\
       owned_cars JSON)"
    );
    console.log("done creating/recreateing tables");
  } catch (error) {
    console.log(error.message);
  }
}

async function insertInitialData(
  agents = [],
  cities = [],
  licenses = [],
  cars = []
) {
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
    console.log("inserting cars");
    await Promise.all(
      cars.map((x) => {
        const sql =
          "INSERT INTO cars(car_number, production_year, manufacturer,\
            manufacturing_country, fuel_type, rank) VALUES (?, ?, ?, ?, ?, ?)";
        return promisePool.query(sql, x);
      })
    ).then(() => console.log("done inserting cars"));
    console.log("inserting agents");
    await Promise.all(
      agents.map((x) => {
        const sql =
          "INSERT INTO agents(first_name, last_name, city, status, license_number, owned_cars) VALUES (?, ?, ?, ?, ?, ?)";
        return promisePool.query(sql, x);
      })
    ).then(() => console.log("done inserting agents"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { insertInitialData, promisePool };
