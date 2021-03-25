'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  likes.init({
    /////////////////////////////////
    like_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    created_at: {
      type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  }
  ///////////////////
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};