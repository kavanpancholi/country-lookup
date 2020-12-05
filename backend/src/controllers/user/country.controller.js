import axios from 'axios';
import { errorResponse, successResponse } from '../../helpers';

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const countries = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword) {
      return errorResponse(req, res, 'Please enter valid keyword', 400);
    }

    const getCountryDetailsRequest = axios.get(`http://restcountries.eu/rest/v2/name/${keyword}`);
    const getExchangeRatesRequest = axios.get('https://api.exchangeratesapi.io/latest?base=SEK');

    axios.all([getCountryDetailsRequest, getExchangeRatesRequest])
      .then(axios.spread((...responses) => {
        const getCountryDetailsResponse = responses[0];
        const getExchangeRatesResponse = responses[1];

        const countries = getCountryDetailsResponse.data.map((item) => {
          item.currencies.map((currency) => {
            currency.rate = typeof getExchangeRatesResponse.data.rates[currency.code] !== 'undefined'
              ? getExchangeRatesResponse.data.rates[currency.code]
              : null;
            return currency;
          });
          return {
            name: item.name,
            population: item.population,
            currencies: item.currencies,
          };
        });
        return successResponse(req, res, { countries });
      }))
      .catch((errors) => {
        if (typeof errors.response !== 'undefined' && errors.response.status === 404) {
          return errorResponse(req, res,
            'Could not find data from specified keyword. Please try again with another keyword',
            errors.response.status);
        }
        const errorCode = errors.response && errors.response.code ? errors.response.code : 500;
        return errorResponse(req, res, errors.message, errorCode);
      });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
