export const enquiryIntegrationData = {
  title: "Add Enquiry Guide",
  method: "POST",
  url: "/enquiry",
  bodyParams: {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
    ccode: "91",
    message: "This is a sample message.",
    service: "Web Development",
    subject: "Enquiry about services",
    header: "Content-Type: application/json",
    uastring: "userAgent",
    ipaddress: "192.168.1.1",
    site: "website key",
  },
  manditoryParams: { email: "john.doe@example.com", site: "website key" },
  headers: {
    "Content-Type": "application/json",
  },
  responseDetails: {
    statusCode: 200,
    message: "Enquiry added successfully",
  },
};

export const feedbackIntegrationData = {
  title: "Add Feedback Guide",
  method: "POST",
  url: "/feedback",
  bodyParams: {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
    ccode: "91",
    feedbackMessage: "This is a sample message.",
    service: "Web Development",
    subject: "Feedback about services",
    header: "Content-Type: application/json",
    uastring: "userAgent",
    ipaddress: "192.168.1.1",
    site: "website key",
  },
  manditoryParams: { email: "john.doe@example.com", site: "website key" },
  headers: {
    "Content-Type": "application/json",
  },
  responseDetails: {
    statusCode: 200,
    message: "Feedback added successfully",
  },
};

export const mailingListIntegrationData = {
  title: "Subscribe to newsletter Guide",
  method: "POST",
  url: "/newsletter",
  bodyParams: {
    email: "john.doe@example.com",
    list: "Updates",
    header: "Sample Header",
    uastring: "userAgent",
    ipaddress: "192.168.1.1",
    site: "website key",
  },
  manditoryParams: { email: "john.doe@example.com", site: "website key" },
  headers: {
    "Content-Type": "application/json",
  },
  responseDetails: {
    statusCode: 200,
    message: "Mailing list added successfully",
  },
};

export const guidePdfIntegrationData = {
  title: "Get Guides Pdf",
  method: "POST",
  url: "/getguides",
  bodyParams: {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
    ccode: "91",
    site: "website key",
  },
  manditoryParams: { email: "john.doe@example.com", site: "website key" },
  headers: {
    "Content-Type": "application/json",
  },
  responseDetails: {
    statusCode: 200,
    message: "Guide sent to your email successfully",
  },
};

export const caseStudyPdfIntegrationData = {
  title: "Get Case Studies Pdf",
  method: "POST",
  url: "/getcasestudies",
  bodyParams: {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
    ccode: "91",
    site: "website key",
  },
  manditoryParams: { email: "john.doe@example.com", site: "website key" },
  headers: {
    "Content-Type": "application/json",
  },
  responseDetails: {
    statusCode: 200,
    message: "casestudy sent to your email successfully",
  },
};

export const popupIntegrationData = {
  title: "Get site Popups",
  method: "POST",
  url: "/getpopups",
  bodyParams: {
    header: "Content-Type: application/json",
    uastring: "userAgent",
    ipaddress: "192.168.1.1",
    sitekey: "website key",
  },
  manditoryParams: { sitekey: "website key" },
  headers: {
    "Content-Type": "application/json",
  },
  responseDetails: {
    statusCode: 200,
    message: "Popups sent to your email successfully",
    data: "popups",
  },
};
