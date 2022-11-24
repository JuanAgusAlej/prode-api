const calculatePoints = (
  match,
  predictionResultPoints,
  predictionGoalsPoints
) => {
  return (prediction) => {
    let points = 0;

    if (match.result === prediction.pick) points = predictionResultPoints;

    if (
      match.goalsA === prediction.goalsA &&
      match.goalsB === prediction.goalsB
    ) {
      points += predictionGoalsPoints;
    }
    return points;
  };
};

module.exports = { calculatePoints };
