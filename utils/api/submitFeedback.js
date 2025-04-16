if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.API = IITJFeedback.API || {};

IITJFeedback.API.submitFeedback = async function(subject, subjectType, sentimentType) {
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

  // Log the payload
  console.log("Payload being sent:", Object.fromEntries(payload));

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
}; 