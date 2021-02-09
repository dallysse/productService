const mongoose = require('mongoose');
const Product = require('../models/products');


exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name description productImage')
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/product/' + doc._id

                        }
                    }
                })
            };
            // if (docs.length >=0) {
            res.status(200).json(response);
            // }else{
            //     res.status(404).json({
            //         message: "No entries found"
            //     });
            // }
            // res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.createProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully!",
                createdProduct: {
                    name: result.name,
                    description: result.description,
                    _id: result._id,
                    result: {
                        type: 'GET',
                        url: 'http://localhost:3000/product/' + result._id
                    }

                }
            });
        })
        .catch(err => {
            console.log(err);
        });
}

/*
exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price._id productImage')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'Get_all_products',
                        url: 'http://localhost:3000/products/'
                    }
                });
            }
            else {
                res.status(404).json({message: "No valid entry found for provided ID"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

}

exports.products_patch_product=(req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.findOneAndRemove({ _id: id })//updated function from .remove()
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product removed successfully",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/',
                    body: {name: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
**/
