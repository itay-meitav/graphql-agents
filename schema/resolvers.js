const { promisePool } = require("../db");

async function resolveSelect(tableName = "", args, single = false) {
  try {
    let query = `SELECT * FROM ${tableName}`;
    let params = [];
    if (Object.keys(args).length) {
      query += " WHERE";
      Object.entries(args).forEach(([column, value], index) => {
        if (index > 0) {
          query += " AND";
        }
        query += ` ${column} = ?`;
        params.push(value);
      });
    }
    const [rows, fields] = await promisePool.query(query, params);
    return single ? rows[0] : rows;
  } catch (error) {
    console.log(error.sqlMessage);
  }
}

module.exports = { resolveSelect };
