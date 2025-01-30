export const Delay = async (seconds: number) =>
  await new Promise((resolve) => {
    setTimeout(resolve, parseInt(`${seconds}000`))
  })
