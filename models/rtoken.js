'use strict';
const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize = require('sequelize');

require('dotenv').config()
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Rtoken extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      Rtoken.belongsTo(User, { foreignKey: 'userid' });
      // define association here
    }
  };
  Rtoken.init({
    /////////////////////////////
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    /////////////////////////////////
    refresh: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    atoken: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
     
    }
    ////////////////////////////////////////

    ////////////////////////////////////////////////////////
    
  }, {   
    sequelize,
    tableName: 'rtokens',
     modelName: 'Rtoken',
    freezeTableName: true,
 
    
    

    
    });
   
  return Rtoken;
};
