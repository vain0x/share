const chokidar = require("chokidar")
const path = require("path")

const nodeEnv = process.env.NODE_ENV
const production = nodeEnv === "production"
const outDir = path.resolve(__dirname, "../out")
const mainPath = path.resolve(__dirname, "../out/infra-main.js")

const main = async () => {
  if (production) {
    return
  }

  let forceReload = true
  const subs = []

  const watcher = chokidar.watch(outDir)
  watcher.on("ready", () => {
    watcher.on("all", () => {
      forceReload = true
    })
  })

  while (true) {
    await new Promise(resolve => setInterval(resolve, 1000))

    if (!forceReload) {
      continue
    }
    forceReload = false

    for (const sub of subs.splice(0)) {
      sub()
    }

    console.debug("Reloading..")
    for (const id of Object.keys(require.cache)) {
      if (/[\/\\]out[\/\\]/.test(id)) {
        delete require.cache[id]
      }
    }

    const { main } = require(mainPath)
    main(subs)
  }
}

main()
