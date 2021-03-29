'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate({ User }) {
      Profile.belongsTo(User, { foreignKey: 'userid' });
      // define association here
    }
  };
  Profile.init({
    userid: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    about: DataTypes.STRING,
    religion: DataTypes.STRING,
    birth: DataTypes.DATE,
    jop: DataTypes.STRING,
    country: DataTypes.STRING,
    Gender:{
      type: DataTypes.STRING,
     /// enum : 
    }
    }, {
    sequelize,
    tableName: 'profiles',
    modelName: 'Profile',
  });
  return Profile;
};