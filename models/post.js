'use strict';
const db = require('../config/db');
const sequelize = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(moedls) {
   //   this.belongsTo(User, {
     //   foreignKey: 'userid',
      //  targetKey: 'userid'
   // });
    }
  };
  Post.init({
    ///////////////////
    postid: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true

    },
    //////////////////
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    ////////////////////////////
    post_type: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
    //////////////////////
    body: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: true,
      }
    },
    ////////////////////////////
    like_count: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    /////////////////////////
    com_count: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    //////////////////////
 
    ///////////////////////////////////////
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
   // freezeTableName: true,
  });
  return Post;
};