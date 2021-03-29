'use strict';
const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
//const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post , Friend , Profile , Like , Comment , Notification}) {

      User.hasMany(Post, { foreignKey: 'userid' });
      User.hasOne(Profile, { foreignKey: 'userid' });
      User.belongsToMany(User, { through: Friend, as: "user1id", foreignKey: "user2id" });
      User.belongsToMany(User, { through: Friend, as: "user2id", foreignKey: "user1id" });
      User.hasMany(Like, { foreignKey: 'userid' });
      User.hasMany(Comment, { foreignKey: 'userid' });
      User.hasMany(Notification, { foreignKey: 'userid' });
      // define association here
    }
  };
  User.init({
    /////////////////////////////
    userid: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true

    },
    /////////////////////////////////
    name: {
      type:DataTypes.STRING,
      len: [2,50],
      trim: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
      },
      
    },
    ////////////////////////////////////////
    password: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your Password'
        },
      },
      
    },
    /////////////////////////////////////////////////
    email: {
    type:DataTypes.STRING,
    len: [2,50],
    trim: true,
      allowNull: false,
      lowercase: true,
    validate: {
      notNull: {
        msg: 'Please enter your Email'
      },
      isEmail: true,
      },
    
    
    },
    //////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    
  }, 
    
   {
    classMethods: {
      generateHash: function (password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }},
        instanceMethods: {
          validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
          }
      },
    sequelize,
    tableName: 'users',
     modelName: 'User',
 //    freezeTableName: true,
   
  });
  return User;
};
