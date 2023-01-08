const { resolveAll, resolveWhere } = require("../schema/resolvers");

const resolversMap = {
  Query: {
    agents: () => resolveAll("agents"),
    cities: () => resolveAll("cities"),
    licenses: () => resolveAll("licenses"),
    cars: () => resolveAll("cars"),
  },
  Agent: {
    city: (agent) => resolveWhere("cities", "city_name", agent.city),
    license_number: (agent) =>
      resolveWhere("licenses", "license_number", agent.license_number),
    car_number: (agent) => resolveWhere("cars", "car_number", agent.car_number),
  },
};

module.exports = { resolversMap };
