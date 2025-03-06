import ApiIntegrationComponent from '../../atoms/common/ApiIntegrationComponent';

const SubscriberIntegration = () => {
  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}/newsletter`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "list": "Updates",
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
  "email": "john.doe@example.com",
  "site": "site key"
}`
    },
    {
      title: 'Response Details',
      content: `{
  "statusCode": 200,
  "message": "You have subscribed successfully"
}`
    }
  ];

  return <ApiIntegrationComponent sections={sections} href={'/subscriber/subscriber-list'} />;
};

export default SubscriberIntegration;
