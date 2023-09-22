const fs = require('node:fs')
const path = require('node:path')
const wt = require('node:worker_threads')
const { pngStream, target, genFileName, count } = require('../base')

const bc = new wt.BroadcastChannel('workers')
const split = 3
if (wt.isMainThread) {
  let c = 0
  bc.onmessage = event => {
    console.log(event.data)
    if (event.data === 'done' &&++c === split) {
      bc.close()
      console.timeEnd('full mission')
    }
  }

  for (let i = 0; i < split; i++) {
    new wt.Worker(__filename, {
      workerData: i,
      argv: [count]
    })
  }
  console.time('full mission')

} else {
  const thread = wt.workerData
  const splitCount = count / split
  function writeFile(thread) {
    for (let i = 0; i < splitCount; i++) {
      const key = `written-${thread}-(${i})`
      const t1 = performance.now()
      const fileName = genFileName(path.join(target, 'logo.png'))
      fs.writeFileSync(fileName, pngStream)
      bc.postMessage(`${key}: ${performance.now() - t1}`)
    }
  }
  writeFile(thread)
  bc.postMessage('done')
  bc.close()
}

