const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: { type: String, required: true},
    productImage: { type: String, required: true},

    createdAt:{
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('Product', productSchema);
