import ApiIntegrationComponent from '../../atoms/common/ApiIntegrationComponent';

const FeedbackIntegration = () => {
  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}feedback`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "+1234567890",
  "ccode": "91",
  "feedbackMessage": "This is a sample message.",
  "service": "Web Development",
  "subject": "Enquiry about services",
  "header": "Content-Type: application/json",
  "uastring": "userAgent",
  "ipaddress": "192.168.1.1",
  "site": "site key"
}`
    },
    {
      title: 'Mandatory Parameters',
      content: `{
  "email": "john.doe@example.com",
  "site": "site key"
}`
    },
    {
      title: 'Request Headers',
      content: `{
  "Content-Type": "application/json"
}`
    },
    {
      title: 'Response Details',
      content: `{
  "statusCode": 200,
  "message": "Feedback added successfully"
}`
    }
  ];

  return <ApiIntegrationComponent sections={sections} href={'/feedback/feedback-list'} />;
};

export default FeedbackIntegration;
