'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notification.init({
    ////////////////////////
    notification: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    /////////////
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false,

    },
    /////////////
    notification_type: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    ////////////////////////
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
    //////////////////////////////////////////
    link: DataTypes.STRING,
    /////////////////////////////////////
    seen: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    },
    /////////////////////////////////
    created_at: {
      type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
    },
    /////////////////////////////
    update_at: {
      type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    field: 'updated_at',
    },
    ////////////////////////////
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};