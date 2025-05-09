
class Country {
  constructor(name, flag) {
    this.name = name;
    this.flag = flag;
  }
}

class CountryDetails {
  constructor(name, population, capital, flag) {
    this.name = name;
    this.population = population;
    this.capital = capital;
    this.flag = flag;
  }
}

module.exports = {
  Country,
  CountryDetails
};