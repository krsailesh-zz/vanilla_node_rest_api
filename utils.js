const fs = require('fs')
const { resolve } = require('path')

function writeDataTofile(filename, content){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if(err){
            console.log(err)
        }
    })
}


function getPostData(req){
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            resolve(body)
        })
    })
}

module.exports = {
    writeDataTofile,
    getPostData
}