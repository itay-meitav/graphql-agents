const { promisePool } = require("../db");

async function resolveAll(tableName) {
  try {
    const sql = `SELECT * FROM ??`;
    const [rows, fields] = await promisePool.query(sql, [tableName]);
    return rows;
  } catch (error) {
    console.log(error.sqlMessage);
  }
}

async function resolveWhere(tableName, column, value) {
  try {
    const sql = "SELECT * FROM ?? WHERE ?? = ?";
    const [rows, fields] = await promisePool.query(sql, [
      tableName,
      column,
      value,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error.sqlMessage);
  }
}

module.exports = {
  resolveAll,
  resolveWhere,
};
