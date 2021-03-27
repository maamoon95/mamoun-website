# mamoun-website
Social Application project
training app for node js by Mamoun Hourani
Reached video #9 on youtube node crash course
last statement: 
created model for blog and connected to to the database
now the user may access all blogs from localhost:3000/all-blogs
the user also may find all blogs inside index through : localhost:3000
user.findAll()
    .then( => ))
    .catch(err => res.render('error', {error: err})));
    npm install -g sequelize sequelize-cli pg pg-hstore
.//////////////
const {
  Model
} = require('sequelize');
//const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    //  User.hasMany(post, {foreignKey:'userid'});
      //this.belongsToMany(this, { through: friend, as: "user1id", foreignKey: "user2id" });
     // this.belongsToMany(this, { through: friend, as: "user2id", foreignKey: "user1id" });

      // define association here
    }
  };
  User.init({
    /////////////////////////////
    userid: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    /////////////////////////////////
    name: {
      type:DataTypes.STRING,
      len: [2,50],
      trim: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
      },
      
    },
    ////////////////////////////////////////
    password: {
      type:DataTypes.STRING,
      len: [2,50],
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your Password'
        }
      },
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('password', hash(value));
      }
    },
    /////////////////////////////////////////////////
    email: {
    type:DataTypes.STRING,
    len: [2,50],
    trim: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your Email'
      },
      isEmail: true,
      },
    
    
    },
    //////////////////////////////////////////////////////
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
    },
    ////////////////////////////////////////////////////////
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};