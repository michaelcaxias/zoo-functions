const { species, employees, hours, prices } = require('./data');
const data = require('./data');


function getSpeciesByIds(...ids) {
  return species.filter(({ id }) => ids.includes(id));
}

function getAnimalsOlderThan(animal, agePopulation) {
  const findAnimal = species.find(({ name }) => animal.includes(name));
  return findAnimal.residents.every(({ age }) => age >= agePopulation);
}

function getEmployeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find((element) => element.firstName
  === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // Colocar todos os gerentes em um Array e verificar se o id está no array.
  const managersList = employees.map((element) => element.managers);
  return managersList.some((element) => element.includes(id));
}

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

function countAnimals(specieName) {
  // Utilizar uma HOF para procurar a espécie e retornar o número da população.
  if (typeof specieName === 'undefined') {
    return species.reduce((acc, element) => {
      acc[`${element.name}`] = element.residents.length;
      return acc;
    }, {});
  }
  return species.find(({ name }) => name === specieName).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
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
