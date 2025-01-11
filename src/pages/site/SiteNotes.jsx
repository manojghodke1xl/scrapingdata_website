export const addWebsiteNote = `This is the Add Website page. It includes fields for adding the Website Name and Host. There is a "Forward Email" toggle, which, when switched on, displays a field for entering an email address. After entering an email and clicking the "Add Email" button, the email is added to a list. You can also remove emails from this list. The SMTP dropdown displays all available SMTP options, which can be selected for sending emails. The Webhook field facilitates two-way communication between tools, apps, and programs used by the organization whenever new data is available for the site. Additionally, there are toggle buttons, including one labeled "Is Website Active?" to set the status of the site as active or inactive.`;
export const editWebsiteNote = `This is the "Edit Website" page. It includes fields for ediing the Website Name and Host. There is a "Forward Email" toggle, which, when switched on, displays a field for entering an email address. After entering an email and clicking the "Add Email" button, the email is added to a list. You can also remove emails from this list. The SMTP dropdown displays all available SMTP options, which can be selected for sending emails. The Webhook field facilitates two-way communication between tools, apps, and programs used by the organization whenever new data is available for the site. Additionally, there are toggle buttons, including one labeled "Is Website Active?" to set the status of the site as active or inactive.`;
export const websiteListNote = `This is the All Websites List page. There is an Add Website button to add a Websites. A filter dropdown is available to filter details by status, allowing you to view all Websites. The table includes the keys of the site,Webiste name, web address, create date, update date, status indicating whether the Websites  is Active or Inactive, and a Edit button to Editing specific Websites  details. There is also a site dropdown that lists all site names. selecting a specific site will show only the details related to that site in the table. Additionally, the table has a checkbox for changing the status of a particular Websites or multiple Websites. There is a search dropdown, and when you select an option, you can search the table based on the selected option.`;

export const enquiryIntegration = [
  {
    title: 'Request Method',
    content: 'POST'
  },
  {
    title: 'Response Details',
    content: `{
"name": "John Doe",
"email": "john.doe@example.com",
"mobile": "+1234567890",
"ccode": "91",
"message": "This is a sample message.",
"service": "Web Development",
"subject": "Enquiry about services",
"header": "Content-Type: application/json",
"uastring": "userAgent",
"ipaddress": "192.168.1.1",
"site": "site key"
}`
  }
];

export const subscriberIntegration = [
  {
    title: 'Request Method',
    content: 'POST'
  },
  {
    title: 'Response Details',
    content: `{
"name": "John Doe",
"email": "john.doe@example.com",
"list": "Updates",
"header": "Content-Type: application/json",
"uastring": "userAgent",
"ipaddress": "192.168.1.1",
"site": "site key"
}`
  }
];
