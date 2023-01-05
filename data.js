const csvtojson = require("csvtojson");
const axios = require("axios");

async function getCities() {
  try {
    const checkTotal = await axios.get(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab"
    );
    const total = checkTotal.data.result.total;
    const getCities = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=${total}`
    );
    const cities = getCities.data.result.records;
    return cities.map((x) => [
      x["שם_ישוב"].trim() || "",
      x["סמל_ישוב"] || "",
      x["שם_נפה"].trim() || "",
      x["לשכה"].trim() || "",
      x["שם_מועצה"] ? true : false,
      x["שם_ישוב_לועזי"].trim() || "",
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAgents() {
  try {
    return csvtojson()
      .fromFile("./agents.csv")
      .then((jsonObj) => {
        return jsonObj.map((x) => [
          x["שם פרטי"] || "",
          x["שם משפחה"] || "",
          x["ישוב"] || "",
          x["סטטוס"] || "",
          x["מספר רישיון"] || "",
        ]);
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getLicesens() {
  try {
    return csvtojson()
      .fromFile("./agents.csv")
      .then((jsonObj) => {
        return jsonObj.map((x) => [
          x["מספר רישיון"] || "",
          parseDate(x["תאריך קבלת רישיון"]) || "",
        ]);
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function parseDate(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

module.exports = { getAgents, getCities, getLicesens };
