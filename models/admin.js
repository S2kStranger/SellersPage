const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const products = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    productName:  {
        type : Sequelize.STRING,
        allowNull : false
    },

    price : {
        type: Sequelize.DOUBLE
    }
});

module.exports= products;