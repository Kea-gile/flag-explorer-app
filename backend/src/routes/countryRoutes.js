const express = require('express');
const CountryController = require('../controllers/CountryController');

const router = express.Router();

router.get('/countries', CountryController.getAllCountries);

router.get('/countries/:name', CountryController.getCountryByName);

module.exports = router;