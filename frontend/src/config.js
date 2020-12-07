const config = {
  baseUrl: (process.env.API_HOST && process.env.API_PORT)
    ? process.env.API_HOST + ':' + process.env.API_PORT
    : 'http://localhost:8080',
  baseCurrencies: [
    "CAD",
    "HKD",
    "ISK",
    "PHP",
    "DKK",
    "HUF",
    "CZK",
    "AUD",
    "RON",
    "SEK",
    "IDR",
    "INR",
    "BRL",
    "RUB",
    "HRK",
    "JPY",
    "THB",
    "CHF",
    "SGD",
    "PLN",
    "BGN",
    "TRY",
    "CNY",
    "NOK",
    "NZD",
    "ZAR",
    "USD",
    "MXN",
    "ILS",
    "GBP",
    "KRW",
    "MYR",
  ]
};

export default config;
