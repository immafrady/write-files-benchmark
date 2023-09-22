const fsPromise = require('node:fs/promises')
const path = require('node:path')
const { pngStream, target, genFileName, count } = require('../base')

async function writeFile(thread) {
  for (let i = 0; i < count; i++) {
    const key = `written-${thread}-(${i})`
    console.time(key)
    const fileName = genFileName(path.join(target, 'logo.png'))
    await fsPromise.writeFile(fileName, pngStream)
    console.timeEnd(key)
  }
}

console.time('full mission')
writeFile('').finally(() => {
  console.timeEnd('full mission')
})

