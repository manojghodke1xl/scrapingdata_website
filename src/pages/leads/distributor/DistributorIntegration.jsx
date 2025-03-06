import ApiIntegrationComponent from '../../../atoms/common/ApiIntegrationComponent';

const DistributorIntegration = () => {
  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}/distributor`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "+234567890",
  "ccode": "91",
  "distributorMessage": "This is a sample message.",
  "service": "Web Development",
  "subject": "Advertisement about services",
  "header": "Content-Type: application/json",
  "uastring": "userAgent",
  "ipaddress": "192.168.1.1",
  "site": "site key",
  "url": "https://example.com",
  "campaign": "Campaign Name",
  "medium": "Medium Name",
  "source": "Source Name",
  "content": "Content Name",
  "term": "Search Term",
  "campaignId": "Campaign ID"
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
  "message": "Distributor enquiry Added Successfully"
}`
    }
  ];

  return <ApiIntegrationComponent sections={sections} href={'/distributor/distributor-list'} />;
};

export default DistributorIntegration;
