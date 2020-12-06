const config = {
  baseUrl: (process.env.API_HOST && process.env.API_PORT)
    ? process.env.API_HOST + ':' + process.env.API_PORT
    : 'http://localhost:8080',
};

export default config;
