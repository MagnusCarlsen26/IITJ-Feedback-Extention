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
    console.log("Subjects drgjfetched:", subjects);
    // const result = await IITJFeedback.Subjects.processSubjects(subjects, type);
    // console.log("Feedback process completed:", result);
    return result;
  } catch (error) {
    console.error('There was a problem with the feedback operation:', error);
  }
} 