import express from "express"
import cors from "cors"
import * as path from "path"
import { getEntry, setEntry } from "./data";

interface WebEnv {
  WEB_HOSTNAME?: string,
  WEB_PORT?: string,
  WEB_HOME?: string,
}

export const webStart = async (envUnknown: unknown, subs: any[]) => {
  const env = envUnknown as WebEnv

  const hostname = env.WEB_HOSTNAME || "localhost"
  const port = +(env.WEB_PORT || "80")
  const indexPath = path.resolve(__dirname, "../docs/index.html")
  const homeUrl = env.WEB_HOME || "/"

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use((req, _res, next) => {
    console.debug(`${req.method} ${req.path}`)
    return next()
  })

  app.get("/", (_req, res) => {
    return res.sendFile(indexPath)
  })

  app.get("/entry", cors(), (req, res) => {
    const { key } = req.query
    const value = getEntry(key)
    if (!value) {
      return res.status(404).send("Not Found")
    }

    res.setHeader("Content-Type", "text/plain")
    return res.status(200).send(value)
  })

  app.post("/entry", cors(), (req, res) => {
    const { key, value } = req.body
    setEntry(key, value)
    return res.redirect(homeUrl)
  })

  const server = app.listen(port, () => {
    console.debug(`Listening at http://${hostname}:${port}`)
  })

  subs.push(() => server.close())
}
