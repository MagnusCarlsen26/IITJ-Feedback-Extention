if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.Sentiment = IITJFeedback.Sentiment || {};

IITJFeedback.Sentiment.getSentimentValue = function(sentimentType) {
  if (sentimentType === "positive") return 5;
  if (sentimentType === "neutral") return 3;
  if (sentimentType === "negative") return 0;
  return 3; // Default to neutral
}; 