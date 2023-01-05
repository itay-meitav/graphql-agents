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

module.exports = { resolveAgents };
