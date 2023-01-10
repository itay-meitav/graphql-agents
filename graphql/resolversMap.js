const {
  resolveSelect,
  resolveDelete,
  resolveInsert,
  resolveUpdate,
} = require("../schema/resolvers");

const resolversMap = {
  Query: {
    agent: (obj, { args }) => resolveSelect("agents", args),
    city: (obj, { args }) => resolveSelect("cities", args),
    license: (obj, { args }) => resolveSelect("licenses", args),
    car: (obj, { args }) => resolveSelect("cars", args),
  },
  Agent: {
    city: (agent) => resolveSelect("cities", { city_name: agent.city }, true),
    license_number: (agent) =>
      resolveSelect("licenses", { license_number: agent.license_number }, true),
    car_number: (agent) =>
      resolveSelect("cars", { car_number: agent.car_number }, true),
  },
  License: {
    license_owner: (license) =>
      resolveSelect("agents", { license_number: license.license_number }, true),
  },
  Car: {
    car_owner: (car) =>
      resolveSelect("agents", { car_number: car.car_number }, true),
  },
  Mutation: {
    updateAgent: (agent, { values, where }) =>
      resolveUpdate("agents", values, where),
    deleteAgent: (agent, { where }) => resolveDelete("agents", where),
    insertAgent: (agent, { values }) => resolveInsert("agents", values),
    updateCity: (city, { values, where }) =>
      resolveUpdate("cities", values, where),
    deleteCity: (city, { where }) => resolveDelete("cities", where),
    insertCity: (city, { values }) => resolveInsert("cities", values),
    updateLicense: (license, { values, where }) =>
      resolveUpdate("licenses", values, where),
    deleteLicense: (license, { where }) => resolveDelete("licenses", where),
    insertLicense: (license, { values }) => resolveInsert("licenses", values),
    updateCar: (car, { values, where }) => resolveUpdate("cars", values, where),
    deleteCar: (car, { where }) => resolveDelete("cars", where),
    insertCar: (car, { values }) => resolveInsert("cars", values),
  },
};

module.exports = { resolversMap };
