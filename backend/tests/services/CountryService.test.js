const axios = require('axios');
const CountryService = require('../../src/services/CountryService');

jest.mock('axios');

describe('CountryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should return a list of countries', async () => {
      const mockData = [{ name: { common: 'France' }, flags: { png: 'france.png' } }];
      axios.get.mockResolvedValue({ data: mockData });

      const countries = await CountryService.getAllCountries();

      expect(countries).toEqual([{ name: 'France', flag: 'france.png' }]);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    });

    it('should throw an error if the API request fails', async () => {
      axios.get.mockRejectedValue(new Error('API error'));

      await expect(CountryService.getAllCountries()).rejects.toThrow('Unable to retrieve countries');
    });
  });

  describe('getCountryByName', () => {
    it('should return country details for a valid country name', async () => {
      const mockData = [{ name: { common: 'France' }, population: 67000000, capital: ['Paris'], flags: { png: 'france.png' } }];
      axios.get.mockResolvedValue({ data: mockData });

      const country = await CountryService.getCountryByName('France');

      expect(country).toEqual({
        name: 'France',
        population: 67000000,
        capital: 'Paris',
        flag: 'france.png',
      });

      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/France');
    });

    it('should return null if the country is not found', async () => {
      axios.get.mockResolvedValue({ data: [] });

      const country = await CountryService.getCountryByName('NonExistentCountry');

      expect(country).toBeNull();
    });

    it('should throw an error if the API request fails', async () => {
      axios.get.mockRejectedValue(new Error('API error'));

      await expect(CountryService.getCountryByName('France')).rejects.toThrow('Unable to retrieve country: France');
    });
  });
});
