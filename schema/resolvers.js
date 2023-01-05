const { promisePool } = require("../db");

async function resolveAgents() {
  try {
    const sql = "SELECT * FROM agents";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function resolveCities() {
  try {
    const sql = "SELECT * FROM cities";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function resolveLicenses() {
  try {
    const sql = "SELECT * FROM licenses";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { resolveAgents, resolveCities, resolveLicenses };
