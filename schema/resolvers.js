const { promisePool } = require("../db");

async function resolvePersons() {
  try {
    const sql = "select * from agents";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { resolvePersons };
