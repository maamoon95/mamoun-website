'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userid' });
      // define association here
    }
  };
  Notification.init({
    /////////////////////////////////////
    notificationid: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ////////////////////////////////////
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    actionid: {
      type:DataTypes.INTEGER,
    },
    postid: {
      type:DataTypes.INTEGER,
    },
    comment_id: {
      type:DataTypes.INTEGER,
    },
    /////////////////////////////////////
    notification_type: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
    ////////////////////////////////////
    body: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    //////////////////////////////////////
    link: {
      type:DataTypes.STRING(1234),
      allowNull: false,
      defaultValue: '0',
    },
    /////////////////////////////////////
    seen: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
   
////////////////////////////////////////
  }, {
    sequelize,
    tableName: 'notifications',
    modelName: 'Notification',
  });
  return Notification;
};