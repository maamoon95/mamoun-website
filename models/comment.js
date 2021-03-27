'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  comment.init({
    comment_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    postid: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    post_type: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
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
    like_count: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    created_at: {
      type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  },
    update_at: {
      type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'updated_at',
  }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};