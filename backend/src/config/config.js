require('dotenv')
  .config();

const sequelizeConfigDefine = {
  underscored: true,
  freezeTableName: true,
  charset: 'utf8',
  dialectOptions: {
    collate: 'utf8_general_ci',
  },
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const x = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
    define: sequelizeConfigDefine,
    fixerApi: process.env.FIXER_API,
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: process.env.TEST_DB_DIALECT,
    logging: false,
    define: sequelizeConfigDefine,
    fixerApi: process.env.FIXER_API,
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.PROD_DB_DIALECT,
    logging: false,
    define: sequelizeConfigDefine,
    fixerApi: process.env.FIXER_API,
  },
};
module.exports = x;
