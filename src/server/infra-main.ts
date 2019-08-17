import { webStart } from "./infra-web"

export const main = async (subs: any[]) => {
  const env = process.env as unknown

  await webStart(env, subs)
}
