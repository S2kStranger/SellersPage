const express = require('express');
const router = express.Router();

const path = require('path');

const indexController=require('../controller/index');

router.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});

router.get('/getProducts',indexController.getProducts);

router.post('/postProduct',indexController.postProduct);

router.delete('/deleteProduct/:id',indexController.deleteProduct);


module.exports=router;