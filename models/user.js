'use strict';
const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config()
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
    static associate({Post , Friend , Profile , Like , Comment , Notification, Rtoken}) {

      User.hasMany(Post, { foreignKey: 'userid' });
      User.hasOne(Profile, { foreignKey: 'userid' });
      User.hasOne(Rtoken, { foreignKey: 'userid' });
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
     unique: true, 
    validate: {
      notNull: {
        msg: 'Please enter your Email'
      },
      isEmail: true,
      },
    
    
    },
    //////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    
  }, {   
    sequelize,
    tableName: 'users',
     modelName: 'User',
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        console.log(process.env.PASSHASH)
       return bcrypt.hash(user.password, 10)
          .then(hash => {
            user.password = hash;
            
          })
          .catch(err => {
            throw new Error();
          });
        
      
      },
      beforeBulkCreate: ( user ) => {
        console.log(process.env.PASSHASH)
     //   console.log(user)
  
       return user.forEach(function(users, index, array){
          console.log(users.password)
            bcrypt.hash(users.password, 10)
          .then(hash => {
            users.password = hash;
            console.log('hashing')
            console.log(users.password)
            array[index] = users.password;
        });
     
          })
         .catch(err => {
           console.log(err)
            throw new Error();
          });
        
      
      }
    }
      // },
      // beforeFind: (user) => {
      //   return bcrypt.hash(user.password, process.env.PASSHASH)
      //     .then(hash => {
      //       user.password = hash;
      //     })
      //     .catch(err => {
      //       throw new Error();
      //     });
      // }
      // }
    
    });
   
  return User;
};
