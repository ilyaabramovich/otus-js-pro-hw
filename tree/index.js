const { argv } = require('process')
const fs = require('fs')
const path = require('path')
const util = require('util')
const lStat = util.promisify(fs.lstat)
const initialPath = argv[2]
let result = { files: [], dirs: [] };

(async () => {
  try {
    await fs.promises.access(initialPath)
    result.dirs.push(initialPath)
    let files = []
    for (let entry of await fs.promises.readdir(initialPath)) {
      files.push(path.join(initialPath, entry))
    }
    while (files.length > 0) {
      let file = files.shift()
      let stats = await lStat(file)
      if (stats.isDirectory()) {
        result.dirs.push(file)
        for (let entry of await fs.promises.readdir(file)) {
          files.push(path.join(file, entry))
        }
      } else {
        result.files.push(file)
      }
    }
    console.log(JSON.stringify(result, null, 2))
  } catch (error) {
    console.log(error)
  }
})()
