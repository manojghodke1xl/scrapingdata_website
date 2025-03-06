import ApiIntegrationComponent from '../../atoms/common/ApiIntegrationComponent';

const PopupIntegration = () => {
  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}/getpopups`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "header": "Content-Type: application/json",
  "uastring": "userAgent",
  "ipaddress": "192.168.1.1",
  "sitekey": "site key"
}`
    },
    {
      title: 'Mandatory Parameters',
      content: `{
  "sitekey": "site key"
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
  "data": { popups }
}`
    }
  ];

  return <ApiIntegrationComponent sections={sections} href={'/pop-up/pop-up-list'} title={'Get Site Popups Guide'} />;
};

export default PopupIntegration;
