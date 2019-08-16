import { webStart } from "./infra-web"

const main = async () => {
  const env = process.env as unknown

  await webStart(env)
}

main()
