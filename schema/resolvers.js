const { promisePool } = require("../db");

async function resolveSelect(tableName = "", args, single = false) {
  try {
    let query = `SELECT * FROM ${tableName}`;
    let params = [];
    if (args) {
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
    return error.sqlMessage;
  }
}

async function resolveUpdate(tableName = "", values, where) {
  try {
    let query = `UPDATE ${tableName} SET`;
    let params = [];
    if (values) {
      Object.entries(values).forEach(([column, value], index) => {
        if (index > 0) {
          query += " ,";
        }
        query += ` ${column} = ?`;
        params.push(value);
      });
      query += " WHERE";
      Object.entries(where).forEach(([column, value], index) => {
        if (index > 0) {
          query += " AND";
        }
        query += ` ${column} = ?`;
        params.push(value);
      });
    }
    const [rows, fields] = await promisePool.query(query, params);
    if (rows) {
      return {
        succes: true,
        data: { message: "record updated successfully" },
      };
    }
  } catch (error) {
    console.log(error.sqlMessage);
    return { succes: false, data: { message: error.sqlMessage } };
  }
}

async function resolveInsert(tableName = "", values) {
  try {
    let query = `INSERT INTO ${tableName}`;
    let params = [];
    if (values) {
      query += "(";
      Object.entries(values).forEach(([column, value], index) => {
        if (index > 0) {
          query += ", ";
        }
        query += column;
        params.push(value);
      });
      query += ") VALUES (";
      Object.keys(values).forEach((value, index) => {
        if (index > 0) {
          query += ", ";
        }
        query += "?";
      });
    }
    query += ")";
    const [rows, fields] = await promisePool.query(query, params);
    if (rows) {
      return {
        succes: true,
        data: { message: "record inserted successfully" },
      };
    }
  } catch (error) {
    console.log(error.sqlMessage);
    return { succes: false, data: { message: error.sqlMessage } };
  }
}

async function resolveDelete(tableName = "", where) {
  try {
    let query = `DELETE FROM ${tableName} WHERE`;
    let params = [];
    if (where) {
      Object.entries(where).forEach(([column, value], index) => {
        if (index > 0) {
          query += " AND";
        }
        query += ` ${column} = ?`;
        params.push(value);
      });
    }
    const [rows, fields] = await promisePool.query(query, params);
    if (rows) {
      return {
        succes: true,
        data: { message: "record deleted successfully" },
      };
    }
  } catch (error) {
    console.log(error.sqlMessage);
    return { succes: false, data: { message: error.sqlMessage } };
  }
}

module.exports = { resolveSelect, resolveUpdate, resolveDelete, resolveInsert };
