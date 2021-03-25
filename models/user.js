'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    /////////////////////////////
    userid: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    /////////////////////////////////
    username: {
      type:DataTypes.STRING,
      len: [2,50],
      trim: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
      },
      isUnique: connection.validateIsUnique(
        'username',
        'choose another username, its already used'
      )
    },
    ////////////////////////////////////////
    password: {
      type:DataTypes.STRING,
      len: [2,50],
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your Password'
        }
      },
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('password', hash(value));
      }
    },
    /////////////////////////////////////////////////
    email: {
    type:DataTypes.STRING,
    len: [2,50],
    trim: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your Email'
      },
      isEmail: true,
      },
      isUnique: connection.validateIsUnique(
        'email',
        'Email Exists, choose another email'
      )
    
    
    },
    //////////////////////////////////////////////////////
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
    },
    ////////////////////////////////////////////////////////
    
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};