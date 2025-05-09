const { Country, CountryDetails } = require('../models/CountryModel');

const transformCountry = (countryData) => {
  return new Country(
    countryData.name.common,
    countryData.flags.png
  );
};

const transformCountryDetails = (countryData) => {
  return new CountryDetails(
    countryData.name.common,
    countryData.population,
    countryData.capital ? countryData.capital[0] : 'N/A',
    countryData.flags.png
  );
};

module.exports = {
  transformCountry,
  transformCountryDetails
};