// helper function
function roundUpToNearest25(number) {
  return (Math.ceil(number/25) * 25)
}

module.exports = roundUpToNearest25
