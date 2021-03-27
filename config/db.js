
const { Sequelize } = require('sequelize');
const path = require('path');
const express = require('express');

module.exports =  new Sequelize('sequelize_db', 'postgres', 's5134747h', {
    host: 'localhost',
    dialect: 'postgres',
    
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
