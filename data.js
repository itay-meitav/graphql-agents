const csvtojson = require("csvtojson");
const axios = require("axios");

async function getCities() {
  try {
    const [cities, citiesResidents] = await Promise.all([
      axios
        .get(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab"
        )
        .then((res) => {
          return axios.get(
            `https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=${res.data.result.total}`
          );
        })
        .then((res) => {
          return res.data.result.records;
        }),
      axios
        .get(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f"
        )
        .then((res) => {
          return axios.get(
            `https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f&limit=${res.data.result.total}`
          );
        })
        .then((res) => {
          return res.data.result.records;
        }),
    ]);
    return cities.map((item1) => {
      const item2 = citiesResidents.find(
        (x) => Number(x.סמל_ישוב.trim()) == item1.סמל_ישוב
      );
      return [
        item1.שם_ישוב.trim() || "",
        item2 ? Number(item2.סמל_ישוב.trim()) : item1.סמל_ישוב,
        item1.שם_נפה.trim() || "",
        item2 ? Number(item2.סהכ.trim()) : null,
        item1.שם_ישוב_לועזי.trim() || "",
      ];
    });
  } catch (error) {
    console.log("There was a problem trying to extract the cities data");
    throw error;
  }
}

async function getAgents() {
  try {
    const cars = await axios
      .get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&limit=50000`
      )
      .then((res) => {
        return res.data.result.records.map((x) => Number(x.mispar_rechev));
      });
    return csvtojson()
      .fromFile("./agents.csv")
      .then((jsonObj) => {
        const usedIndexes = new Set();
        return jsonObj.map((x) => {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * cars.length);
          } while (usedIndexes.has(randomIndex));
          usedIndexes.add(randomIndex);
          return [
            x["שם פרטי"].trim() || "",
            x["שם משפחה"].trim() || "",
            x["ישוב"].trim() || "",
            x["סטטוס"].trim() || "",
            Number(x["מספר רישיון"].trim()) || "",
            Number(cars[randomIndex]),
          ];
        });
      });
  } catch (error) {
    console.log("There was a problem trying to extract the agents data");
    throw error;
  }
}

async function getLicesens() {
  try {
    const licesensTypes = await axios
      .get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=c680ada6-9af1-47ab-9acf-d6585df6ad47"
      )
      .then((res) => {
        return axios.get(
          `https://data.gov.il/api/3/action/datastore_search?resource_id=c680ada6-9af1-47ab-9acf-d6585df6ad47&limit=${res.data.result.total}`
        );
      })
      .then((res) => {
        return res.data.result.records
          .filter((x) => x.Type == "רישיון נהיגה")
          .map((x) => x.Rank.trim());
      });
    const licenses = await csvtojson().fromFile("./agents.csv");
    return licenses.map((item1) => {
      const randomIndex = Math.floor(Math.random() * licesensTypes.length);
      const item2 = licesensTypes.find((x, i) => i === randomIndex);
      return [
        Number(item1["מספר רישיון"].trim()) || "",
        parseDate(item1["תאריך קבלת רישיון"]) || "",
        item2,
      ];
    });
  } catch (error) {
    console.log("There was a problem trying to extract the licenses data");
    throw error;
  }
}

async function getCars() {
  try {
    const [cars, licesensTypes] = await Promise.all([
      axios
        .get(
          `https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&limit=50000`
        )
        .then((res) => {
          return res.data.result.records;
        }),
      axios
        .get(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=c680ada6-9af1-47ab-9acf-d6585df6ad47"
        )
        .then((res) => {
          return axios.get(
            `https://data.gov.il/api/3/action/datastore_search?resource_id=c680ada6-9af1-47ab-9acf-d6585df6ad47&limit=${res.data.result.total}`
          );
        })
        .then((res) => {
          return res.data.result.records
            .filter((x) => x.Type == "רישיון נהיגה")
            .map((x) => x.Rank.trim());
        }),
    ]);
    return cars.map((x) => {
      const randomLicense =
        licesensTypes[Math.floor(Math.random() * licesensTypes.length)];
      return [
        Number(x.mispar_rechev) || "",
        Number(x.shnat_yitzur.trim()) || "",
        x.tozeret_nm.trim() || "",
        x.tozeret_eretz_nm.trim() || "",
        x.sug_delek_nm.trim() || "",
        randomLicense || "",
      ];
    });
  } catch (error) {
    console.log("There was a problem trying to extract the cars data");
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

module.exports = { getAgents, getCities, getLicesens, getCars };
