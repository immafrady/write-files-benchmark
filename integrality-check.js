const fs = require('node:fs')
const { target } = require('./base')

const dir = fs.readdirSync(target)
console.log(dir.length)
