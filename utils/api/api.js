// API namespace for API-related functions
if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.API = {
  // Fetch subjects from the server
  async fetchSubjects() {
    try {
      const response = await fetch("https://erp.iitj.ac.in/AcadResearch/getsubjectlistforfeedback.htm?order=asc&_=1730831282661", {
        headers: {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        referrer: "https://erp.iitj.ac.in/AcadResearch/feedbackform.htm",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      throw error;
    }
  },

  // Submit feedback for a subject
  async submitFeedback(subject, subjectType, sentimentType) {
    // Get sentiment value
    const typeOfReview = IITJFeedback.Sentiment.getSentimentValue(sentimentType);
    console.log("Sentiment type:", sentimentType, "Value:", typeOfReview);
    
    // Prepare request parameters
    const baseParams = {
      action: '',
      subtype: subjectType.type,
      instructor: subject.instructor,
      subno: subject.course_code,
      captcha: 'HX)Kya'
    };
    
    // Create responses array
    const responses = Array(subjectType.count).fill(typeOfReview);
    responses.push('The course was challenging but fair, with interesting case studies.');
    
    // Build payload
    const payload = new URLSearchParams(baseParams);
    responses.forEach((response, index) => {
      payload.append(`response_${index + 1}`, response);
    });

    try {
      // Send the request
      const response = await fetch("https://erp.iitj.ac.in/AcadResearch/insertfeedback.htm", {
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        referrer: "https://erp.iitj.ac.in/AcadResearch/feedbackform.htm",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: payload,
        method: "POST",
        mode: "cors",
        credentials: "include"
      });
      
      // Process the response
      const data = await response.text();
      console.log("API call successful:", data);
      
      return {
        success: true,
        data: data,
        subject: subject.course_code,
        type: subjectType.type
      };
    } catch (error) {
      console.error("API call failed:", error);
      return {
        success: false,
        error: error.message,
        subject: subject.course_code,
        type: subjectType.type
      };
    }
  }
}; 