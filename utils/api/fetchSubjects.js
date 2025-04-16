if (typeof IITJFeedback === 'undefined') {
  window.IITJFeedback = {};
}

IITJFeedback.API = IITJFeedback.API || {};

IITJFeedback.API.fetchSubjects = async function() {
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
}; 