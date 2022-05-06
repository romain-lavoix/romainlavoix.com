const cls = (input: [string, boolean | string]) =>
  input
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim()

export default cls
