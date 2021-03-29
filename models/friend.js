'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
    }
  };
  Friend.init({
    /////////////////////////////////////////////////////////
 
    ///////////////////////////////////////////////////
    status: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
    ////////////////////////////////////////////////
    user1id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    //////////////////////////////////////////////////////////////
    user2id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    }
    ////////////////////////////////////////////
  }, {
    sequelize,
    tableName: 'friends',
    modelName: 'Friend',
  });
  return Friend;
};