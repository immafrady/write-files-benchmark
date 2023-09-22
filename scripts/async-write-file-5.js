const fsPromise = require('node:fs/promises')
const path = require('node:path')
const { pngStream, target, genFileName, count } = require('../base')

const split = Math.ceil(count / 5)
async function writeFile(thread) {
  for (let i = 0; i < split; i++) {
    const key = `written-${thread}-(${i})`
    console.time(key)
    const fileName = genFileName(path.join(target, 'logo.png'))
    await fsPromise.writeFile(fileName, pngStream)
    console.timeEnd(key)
  }
}

console.time('full mission')
Promise.allSettled([
  writeFile(0),
  writeFile(1),
  writeFile(2),
  writeFile(3),
  writeFile(4)
]).finally(() => {
  console.timeEnd('full mission')
})
