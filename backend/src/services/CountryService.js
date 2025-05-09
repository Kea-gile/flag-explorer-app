const axios = require('axios');
const { transformCountry, transformCountryDetails } = require('../helpers/utils');

class CountryService {
  constructor() {
    this.apiBaseUrl = 'https://restcountries.com/v3.1';
  }

  async getAllCountries() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/all`);
      return response.data.map(transformCountry);
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new Error('Unable to retrieve countries');
    }
  }

  async getCountryByName(name) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/name/${name}`);
      
      if (!response.data || response.data.length === 0) {
        return null;
      }
      
      return transformCountryDetails(response.data[0]);
    } catch (error) {
      // If the country isn't found, the API returns a 404
      if (error.response && error.response.status === 404) {
        return null;
      }
      
      console.error(`Error fetching country ${name}:`, error);
      throw new Error(`Unable to retrieve country: ${name}`);
    }
  }
}

module.exports = new CountryService();