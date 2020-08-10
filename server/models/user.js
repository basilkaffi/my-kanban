'use strict';
const { hashingPswd } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name is null'
        },
        notEmpty: {
          msg: 'name cannot be empty'
        }
      }
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email is null'
        },
        isEmail: {
          msg: 'email format is wrong'
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'passoword is null'
        },
        notEmpty: {
          msg: 'passoword cannot be empty'
        }
      }
    },
    organization: {
      type: DataTypes.STRING,
      validate: {
        equals: {
          args: 'Hacktiv8',
          msg: 'organization must be "Hacktiv8"'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.organization = 'Hacktiv8'
        user.password = hashingPswd(user.password)
      }
    }, sequelize
  });
  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};