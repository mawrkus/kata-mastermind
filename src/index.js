/**
 * @param {Array} secret
 * @param {Array} guess
 * @return {Number[]}
 */
function evaluate(secret, guess) {
  const secretColorsIndexLookup = secret.reduce((acc, color, index) => ({
    ...acc,
    [`${color}`]: index,
  }), {});

  let wellPlacedCount = 0;
  let misplacedCount = 0;

  guess.forEach((color, index) => {
    if (typeof secretColorsIndexLookup[color] === 'undefined') {
      return;
    }
    if (secretColorsIndexLookup[color] === index) {
      wellPlacedCount += 1;
      return;
    }
    misplacedCount += 1;
  });

  return [wellPlacedCount, misplacedCount];
}

module.exports = evaluate;
