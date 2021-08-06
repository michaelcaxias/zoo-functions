const { species } = require('./data');

const animalsRegion = (local) => {
  const animalsFilter = species.filter((animal) => animal.location === local);
  const mapAnimalNames = animalsFilter.map((animalName) => animalName.name);
  return mapAnimalNames;
};

function noParameter(options) {
  if (typeof options === 'undefined') {
    const animalsLocation = species.reduce((acc) => {
      acc.NE = animalsRegion('NE');
      acc.NW = animalsRegion('NW');
      acc.SE = animalsRegion('SE');
      acc.SW = animalsRegion('SW');
      return acc;
    }, {});
    return animalsLocation;
  }
}

const animalsResidents = (animal) => {
  const residentsFilter = species.find((element) => element.name === animal).residents;
  return residentsFilter.map((element) => element.name);
};

const test = (region) => {
  const ne = animalsRegion(region);
  return ne.reduce((acc, curr) => {
    const animalsObject = { [curr]: animalsResidents(curr) };
    acc.push(animalsObject);
    return acc;
  }, []);
};
console.log(test('NE'));

module.exports = {
  noParameter,
  animalsResidents,
};
