const request = require('supertest');
const express = require('express');
const countryRoutes = require('../../src/routes/countryRoutes');
const CountryService = require('../../src/services/CountryService');

jest.mock('../../src/services/CountryService');

const app = express();
app.use(express.json());
app.use('/api', countryRoutes);

describe('CountryController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/countries', () => {
    it('should return a list of countries', async () => {
      const mockCountries = [{ name: 'France', flag: 'france.png' }];
      CountryService.getAllCountries.mockResolvedValue(mockCountries);

      const response = await request(app).get('/api/countries');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCountries);
    });

    it('should handle errors when fetching countries', async () => {
      CountryService.getAllCountries.mockRejectedValue(new Error('Service error'));

      const response = await request(app).get('/api/countries');

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/countries/:name', () => {
    it('should return country details for a valid country name', async () => {
      const mockCountry = { name: 'France', population: 67000000, capital: 'Paris', flag: 'france.png' };
      CountryService.getCountryByName.mockResolvedValue(mockCountry);

      const response = await request(app).get('/api/countries/France');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCountry);
    });

    it('should return 404 if the country is not found', async () => {
      CountryService.getCountryByName.mockResolvedValue(null);

      const response = await request(app).get('/api/countries/NonExistent');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Country 'NonExistent' not found");
    });

    it('should handle errors when fetching a country by name', async () => {
      CountryService.getCountryByName.mockRejectedValue(new Error('Service error'));

      const response = await request(app).get('/api/countries/France');

      expect(response.status).toBe(500);
    });
  });
});
