const fs = require('node:fs')
const path = require('node:path')
const { pngStream, target, genFileName, count, genRandom36Name } = require('../base')

const map = new Map()
function writeFile(thread) {
  for (let i = 0; i < count; i++) {
    const key = `written-${thread}-(${i})`
    console.time(key)
    let fullName = path.join(target, `${genRandom36Name()}-logo.png`)
    let idx = 1
    if (map.has(fullName)) {
      idx = map.get(fullName)
    } else {
      map.set(fullName, idx)
    }
    const { fullName: fileName, counter: newCounter } = genFileName(path.join(target, `${genRandom36Name()}-logo.png`), idx)
    map.set(fullName, newCounter)
    fs.writeFileSync(fileName, pngStream)
    console.timeEnd(key)
  }
}

console.time('full mission')
writeFile('')
console.timeEnd('full mission')
