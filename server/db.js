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
  await attachOwners();
}

async function createInitialTables() {
  try {
    await promisePool.query("SET FOREIGN_KEY_CHECKS=0");
    await promisePool.query(
      "DROP TABLE IF EXISTS agents, cities, licenses, cars"
    );
    await promisePool.query(
      "CREATE TABLE cities(city_name VARCHAR(200) PRIMARY KEY, city_code INT, sieve TEXT,\
       residents INT, english_name TEXT)"
    );
    await promisePool.query(
      "CREATE TABLE licenses(license_number INT PRIMARY KEY, license_date DATE, rank TEXT, license_owner INT)"
    );
    await promisePool.query(
      "CREATE TABLE cars(car_number INT PRIMARY KEY, production_year INT, manufacturer TEXT,\
       manufacturing_country TEXT, fuel_type TEXT, rank TEXT, car_owner INT)"
    );
    await promisePool.query(
      "CREATE TABLE agents(id INT PRIMARY KEY AUTO_INCREMENT, first_name TEXT, last_name TEXT, city VARCHAR(200),\
       FOREIGN KEY(city) REFERENCES cities(city_name) ON UPDATE CASCADE ON DELETE SET NULL, status TEXT,\
       license_number INT, FOREIGN KEY(license_number) REFERENCES licenses(license_number) ON UPDATE CASCADE\
       ON DELETE SET NULL, car_number INT, FOREIGN KEY(car_number) REFERENCES cars(car_number) ON UPDATE CASCADE\
       ON DELETE SET NULL)"
    );
    await promisePool.query(
      "ALTER TABLE licenses ADD FOREIGN KEY (license_owner) REFERENCES agents(id) ON UPDATE CASCADE ON DELETE\
       SET NULL"
    );
    await promisePool.query(
      "ALTER TABLE cars ADD FOREIGN KEY (car_owner) REFERENCES agents(id) ON UPDATE CASCADE ON DELETE SET NULL"
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
          "INSERT INTO agents(first_name, last_name, city, status, license_number, car_number) VALUES (?, ?, ?, ?, ?, ?)";
        return promisePool.query(sql, x);
      })
    ).then(() => console.log("done inserting agents"));
  } catch (error) {
    console.log(error);
  }
}

async function attachOwners() {
  console.log("attaching owners");
  try {
    const agentsSql = "SELECT * from agents";
    const carsSql = "SELECT * from cars";
    const licensesSql = "SELECT * from licenses";
    const [agents, cars, licenses] = await Promise.all([
      promisePool.query(agentsSql).then(([rows, fields]) => {
        return rows;
      }),
      promisePool.query(carsSql).then(([rows, fields]) => {
        return rows;
      }),
      promisePool.query(licensesSql).then(([rows, fields]) => {
        return rows;
      }),
    ]);
    await Promise.all([
      Promise.all(
        licenses.map((license) => {
          const agentId = agents.find(
            (x) => x.license_number == license.license_number
          );
          if (agentId) {
            const sql =
              "UPDATE licenses SET license_owner = ? WHERE license_number = ?";
            return promisePool.query(sql, [agentId.id, license.license_number]);
          }
        })
      ),
      Promise.all(
        cars.map((car) => {
          const agentId = agents.find((x) => x.car_number == car.car_number);
          if (agentId) {
            const sql = "UPDATE cars SET car_owner = ? WHERE car_number = ?";
            return promisePool.query(sql, [agentId.id, car.car_number]);
          }
        })
      ),
    ]).then(() => console.log("done attaching owners"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { insertInitialData, promisePool };
