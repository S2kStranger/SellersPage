const path = require('path');

const Products = require('../models/admin');

exports.getProducts =(req,res,next) => {

    Products.findAll()
    .then(products => {
        res.status(200).json({allproducts: products});
    })
    .catch(err => console.log(err));
};


exports.postProduct = (req,res,next) => {   
    
    //console.log(req.body);
    if(!req.body.pname || !req.body.pprice)
    {
        throw new Error("Fields cannot be empty");
    }
    const name=req.body.pname;
    const price=req.body.pprice;
       // console.log("entered in postproduct");
        Products
        .create({
            productName : name,
            price : price,
        })
        .then(product => {
            res.status(200).json({productdata: product});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


exports.deleteProduct = (req,res,next) => {
    const pid = req.params.id;
    Products.findByPk(pid)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            //console.log("destroyed");
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}