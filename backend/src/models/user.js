import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withSecretColumns: {
        attributes: { include: ['password'] },
      },
    },
  });

  User.prototype.validPassword = (
    enteredPassword,
    userPassword,
  ) => bcrypt.compare(enteredPassword, userPassword);

  const hashPassword = async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8));
    }
  };
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  return User;
};
