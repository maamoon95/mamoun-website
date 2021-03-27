'use strict';
const db = require('../config/db');
const sequelize = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Like.init({
    /////////////////////////////////
    like_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true


    },
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    ////////////////////////////////////////////////
    postid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    /////////////////////////////////////////////
    reaction_type: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
    ///////////////////////////////////////////////////////////
 
  ///////////////////
  }, {
    sequelize,
    tableName: 'likes',
    modelName: 'Like',
 //   freezeTableName: true,
  });
  return Like;
};