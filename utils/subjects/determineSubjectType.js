if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.Subjects = IITJFeedback.Subjects || {};

IITJFeedback.Subjects.determineSubjectType = function(subject) {
  const options = {
    "lecture": {
      type: "L",
      count: 34
    },
    "tutorial": {
      type: "T",
      count: 34
    },
    "practical": {
      type: "P",
      count: 40
    }
  };
  
  const optionTypes = ["lecture", "tutorial", "practical"];
  
  for (let i = 0; i < optionTypes.length; i++) {
    if (subject[optionTypes[i]] === "Pending") {
      return {
        type: options[optionTypes[i]].type,
        count: options[optionTypes[i]].count
      };
    }
  }
  
  return null;
}; 