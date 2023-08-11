const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const User = require('./models/admin');

app.use(bodyParser.json({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const index=require('./routes/index');

app.use(index);



sequelize
.sync()
.then(result => {
    app.listen(3000);
    console.log(result);
})
.catch(err => console.log(err));

