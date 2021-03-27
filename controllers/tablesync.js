const { Sequelize } = require('sequelize');

const { sequelize, User, Post , Like} = require('../models')
// syncing tables ...
console.log('syncing tables..');
 User.sync({force : false}).then(() => {
  console.log('User table synced');
  
 });
 Post.sync({force : false}).then(() => {
    console.log('Post table synced');
 });
 Like.sync({force : false}).then(() => {
    console.log('Like table synced');
 }).then(() => {
    console.log('all table synced');
    
   });