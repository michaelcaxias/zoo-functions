const { species, employees, prices, hours } = require('./data');
const data = require('./data');

// -----1-----
function getSpeciesByIds(...ids) {
  return species.filter(({ id }) => ids.includes(id));
}

// -----2-----
function getAnimalsOlderThan(animal, agePopulation) {
  const findAnimal = species.find(({ name }) => animal.includes(name));
  return findAnimal.residents.every(({ age }) => age >= agePopulation);
}

// -----3-----
function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find((element) => element.firstName
  === employeeName || element.lastName === employeeName);
}

// -----4-----
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// -----5-----
function isManager(id) {
  // Colocar todos os gerentes em um Array e verificar se o id está no array.
  const managersList = employees.map((element) => element.managers);
  return managersList.some((element) => element.includes(id));
}

// -----6-----
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newObject);
}

// -----7-----
function countAnimals(specieName) {
  // Utilizar uma HOF para procurar a espécie e retornar o número da população.
  if (typeof specieName === 'undefined') {
    return species.reduce((acc, element) => {
      acc[element.name] = element.residents.length;
      return acc;
    }, {});
  }
  return species.find(({ name }) => name === specieName).residents.length;
}

// -----8-----
function calculateEntry(entrants) {
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child);
}

// -----9-----
function getAnimalMap(options) {
}
// -----10-----

function getSchedule(dayName) {
  const daysObject = Object.keys(hours).reduce((acc, curr) => {
    let hoursText = `Open from ${hours[curr].open}am until ${hours[curr].close - 12}pm`;
    if (hours[curr].open === 0) hoursText = 'CLOSED';
    acc[curr] = hoursText;
    return acc;
  }, {});

  if (!dayName) return daysObject;
  return { [`${dayName}`]: daysObject[`${dayName}`] };
}

// -----11-----
function getOldestFromFirstSpecies(employeeId) {
  const findId = employees.find(({ id }) => id === employeeId);
  const findAnimalEmployee = findId.responsibleFor[0];
  const findAnimal = species.find(({ id }) => id.includes(findAnimalEmployee));
  const oldestAnimal = findAnimal.residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestAnimal);
}

// -----12-----
function increasePrices(percentage) {
  // https://javascript.info/number
  const profit = percentage / 100;
  const { Adult, Senior, Child } = prices;
  const adultProfit = Adult + Adult * profit;
  const seniorProfit = Senior + Senior * profit;
  const childProfit = Child + Child * profit;
  prices.Adult = Math.round(adultProfit * 100) / 100;
  prices.Senior = Math.round(seniorProfit * 100) / 100;
  prices.Child = Math.round(childProfit * 100) / 100;
}

// -----13-----
function getEmployeeCoverage(idOrName) {
  if (typeof idOrName === 'undefined') {
    const allEmployees = employees.reduce((acc, curr) => {
      const findAnimals = curr.responsibleFor.map((animalId) =>
        species.find(({ id }) => id === animalId).name);
      acc[`${curr.firstName} ${curr.lastName}`] = findAnimals;
      return acc;
    }, {});
    return allEmployees;
  }

  const getEmployee = employees.find(({ id, firstName, lastName }) => id === idOrName
   || firstName === idOrName || lastName === idOrName);
  const findAnimalEmployee = getEmployee.responsibleFor;
  const findAnimals = findAnimalEmployee.map((animalId) =>
    species.find(({ id }) => id === animalId).name);
  return {
    [`${getEmployee.firstName} ${getEmployee.lastName}`]: findAnimals,
  };
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
