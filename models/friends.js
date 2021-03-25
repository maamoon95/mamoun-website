'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  friends.init({
    /////////////////////////////////////////////////////////
    fr_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ///////////////////////////////////////////////////
    status: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
    ////////////////////////////////////////////////
    created_at: {
      type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
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
    modelName: 'friends',
  });
  return friends;
};