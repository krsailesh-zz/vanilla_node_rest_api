const Products = require('../models/product_model')
const { getPostData } = require('../utils')


// @desc    gets all products
// @route   GET /api/products   
async function getProducts(req, res) {
    try {
        const products = await Products.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    gets single product
// @route   GET /api/products/:id 
async function getProduct(req, res, id) {
    try {
        const product = await Products.findById(id)
        // console.log(product.name)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    create a product
// @route   POST /api/products   
async function createProduct(req, res) {
    try {

        let body = await getPostData(req)
        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Products.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

// @desc    update a product
// @route   PUT /api/products   
async function updateProduct(req, res, id) {
    try {
        const product = await Products.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        }
        else {
            let body = await getPostData(req)
            const { title, description, price } = JSON.parse(body)

            const newProduct = {
                title : title || product.title,
                description : description || product.description,
                price : price || product.price
            }

            const updProduct = await Products.update(id,newProduct)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updProduct))
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc    delete product
// @route   DELETE /api/products/:id 
async function deleteProduct(req, res, id) {
    try {
        const product = await Products.findById(id)
        // console.log(product.name)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        }
        else {

            await Products.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({message : `product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}