// Main entry point for the extension
console.log("Extension initialized");

// Initialize the extension when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to buttons
  document.getElementById('positive').addEventListener('click', () => {
    sendFeedbackType("positive");
  });

  document.getElementById('neutral').addEventListener('click', () => {
    sendFeedbackType("neutral");
  });

  document.getElementById('negative').addEventListener('click', () => {
    sendFeedbackType("negative");
  });
});

// Function to send feedback type
function sendFeedbackType(type) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: fillFeedback,
      args: [type]
    });
  });
}

// Function to fill feedback
async function fillFeedback(type) {
  console.log("Starting feedback process for type:", type);
  try {
    const subjects = await IITJFeedback.API.fetchSubjects();
    const pendingSubmissions = [];
    
    // First loop: Collect all subjects and their types
    for (const subject of subjects) {
      const subjectType = IITJFeedback.Subjects.determineSubjectType(subject);
      if (subjectType) {
        pendingSubmissions.push({
          subject: subject,
          subjectType: subjectType
        });
      }
    }
    
    console.log("Collected submissions:", pendingSubmissions);
    const results = [];

    // Second loop: Submit feedback for all collected subjects
    for (const submission of pendingSubmissions) {

      if ( submission.subject.course_code !== "LAL4060" ) continue
      const feedbackResult = await IITJFeedback.API.submitFeedback(
        submission.subject, 
        submission.subjectType, 
        type
      );
      results.push({
        subject: submission.subject,
        subjectType: submission.subjectType,
        feedbackResult: feedbackResult
      });
    }
    
    console.log("Feedback process completed:", results);
    return results;
  } catch (error) {
    console.error('There was a problem with the feedback operation:', error);
  }
} 