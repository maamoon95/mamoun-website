'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      Comment.belongsTo(User, { foreignKey: 'userid' });
      Comment.belongsTo(Post, { foreignKey: 'postid' });
      // define association here
    }
  };
  Comment.init({
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
    }

  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};