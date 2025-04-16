// Subjects namespace for subject-related functions
if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.Subjects = {
  // Process subjects and submit feedback
  async processSubjects(subjects, sentimentType) {
    console.log("Processing subjects:", subjects);
    
    const results = [];
    
    for (const subject of subjects) {
      const subjectType = IITJFeedback.Subjects.determineSubjectType(subject);
      
      if (subjectType) {
        const feedbackResult = await IITJFeedback.API.submitFeedback(subject, subjectType, sentimentType);
        results.push({
          subject: subject,
          subjectType: subjectType,
          feedbackResult: feedbackResult
        });
      }
    }
    
    return results;
  },

  // Determine the type of a subject
  determineSubjectType(subject) {
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
  }
}; 