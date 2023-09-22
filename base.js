const path = require('node:path')
const fs = require('node:fs')

function genFileName(pathName, counter = 1, existsSync = fs.existsSync) {
  const extension = path.extname(pathName)
  const baseName = pathName.slice(0, -extension.length)
  let fullName = baseName + extension
  try {
    while (existsSync(fullName)) {
      fullName = baseName + '(' + counter + ')' + extension
      counter++
    }
  } catch (e) {
    console.error(e)
  }
  return { fullName, counter }
}

const target = path.resolve('') // todo 地址
fs.mkdirSync(target, { recursive: true })

const argv = process.argv.slice(2)
const count = argv[0] ?? 50000
module.exports = {
  target,
  count,
  pngStream: fs.readFileSync(path.resolve('./logo.png')),
  genFileName,
  genRandom36Name() {
    return Math.floor(Math.random() * 36).toString(36).toUpperCase()
  }
}
