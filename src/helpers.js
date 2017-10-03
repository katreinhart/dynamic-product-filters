// helper function
function roundUpToNearest(roundTo, number) {
  return (Math.ceil(number/roundTo) * roundTo)
}

module.exports = roundUpToNearest
