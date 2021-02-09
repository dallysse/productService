const express = require('express');
const { createProduct } = require ('../controllers/products');
const ProductsController = require ('../controllers/products');
const Product = require('../models/products');

const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb (null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }, fileFilter: fileFilter
})

//router.get('/', getProducts);

//const upload= multer({dest: ('uploads/')})
//const upload= multer({storage: storage});




/*router.post('/', (req, res)=> {
    console.log(req.body);
});**/

/*router.post ( '/', async (req, res )=>{// asyncronik call back function

    const newProduct = new Product(req.body);
    try {
       const prod = await newProduct.save();
       if(!prod) throw Error('Something went wrong');
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});**/

router.post('/', upload.single('productImage'), createProduct);
router.get('/', ProductsController.products_get_all);


//router.get('/:productId', ProductsController.products_get_product);

//router.patch('/:productId', ProductsController.products_patch_product);

//router.delete('/:productId', ProductsController.products_delete);
module.exports = router;
