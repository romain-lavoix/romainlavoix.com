const cls = (input) =>
  input
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim()

export default cls
