let products = require('../data/product.json')
const { v4 : uuidv4 } = require('uuid')
const { writeDataTofile } = require('../utils.js')

function findAll(){
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const product = products.find((obj) => {
            return obj.id == id
        })
        resolve(product)
    })
}

function create(product){
    return new Promise((resolve, reject) => {
        const newProduct = {
            id : uuidv4(),
            ...product
        }
        products.push(newProduct)
        writeDataTofile('./data/product.json', products)
        resolve(newProduct)
    })
}

function update(id,product){
    return new Promise((resolve, reject) => {
        const index = products.findIndex((obj) => {
            return obj.id === id
        })

        products[index] = {
            id,
            ...product
        }

        writeDataTofile('./data/product.json', products)
        resolve(products[index])
    })
}

function remove(id){
    return new Promise((resolve, reject) => {
        products = products.filter((e) => {
            return e.id != id
        })
        writeDataTofile('./data/product.json', products)
        resolve()
    })
}
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}