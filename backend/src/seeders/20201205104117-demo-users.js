const bcrypt = require('bcrypt');

const hash = async password => bcrypt.hash(password, bcrypt.genSaltSync(8));

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'users',
    [
      {
        first_name: 'Kavan',
        last_name: 'Pancholi',
        email: 'kavanpancholi@gmail.com',
        password: await hash('password'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@gmail.com',
        password: await hash('password'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
