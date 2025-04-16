if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.Subjects = IITJFeedback.Subjects || {};

IITJFeedback.Subjects.processSubjects = async function(subjects, sentimentType) {
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
}; 