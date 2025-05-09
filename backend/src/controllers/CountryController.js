const CountryService = require('../services/CountryService');

class CountryController {

  static async getAllCountries(req, res, next) {
    try {
      const countries = await CountryService.getAllCountries();
      res.status(200).json(countries);
    } catch (error) {
      next(error);
    }
  }

  static async getCountryByName(req, res, next) {
    try {
      const { name } = req.params;
      const country = await CountryService.getCountryByName(name);
      
      if (!country) {
        return res.status(404).json({ message: `Country '${name}' not found` });
      }
      
      res.status(200).json(country);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CountryController;