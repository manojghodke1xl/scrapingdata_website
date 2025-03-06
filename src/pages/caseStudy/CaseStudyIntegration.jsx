import ApiIntegrationComponent from '../../atoms/common/ApiIntegrationComponent';

const CaseStudyIntegration = () => {
  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}/getcasestudies`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "+1234567890",
  "ccode": "91",
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
  "message": "Case study sent to your email successfull"
}`
    }
  ];

  return <ApiIntegrationComponent sections={sections} href={'/case-study/case-study-list'} title={'Integration Guide PDF'} />;
};

export default CaseStudyIntegration;
