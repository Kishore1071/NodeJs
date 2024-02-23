const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_name : {
        type: String,
        required: true
    },
    code: String
})

module.exports = mongoose.model('product', productSchema)