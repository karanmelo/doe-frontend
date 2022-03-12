type Freeze = (timeout?: number) => Promise<number>;

export const freeze: Freeze = (timeout = 1000) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve) => setTimeout(resolve, timeout));
