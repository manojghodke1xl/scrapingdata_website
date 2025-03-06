import ApiIntegrationComponent from '../../atoms/common/ApiIntegrationComponent';

const PaymentIntegration = () => {
  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}make-payment`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "amount": "100",
  "code": "Coupon code",
  "currency": "INR",
  "event": "event key",
  "userDetails": "{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "contact": "+1234567890",
    attendee: "1"
    }",
  "paymentMethod": "razorpay",
}`
    },
    {
      title: 'Mandatory Parameters',
      content: `{
  "amount": "100",
  "code": "Coupon code",
  "currency": "INR",
  "event": "event key",
  "userDetails": "{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "contact": "+1234567890",
    attendee: "1"
    }"
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
  "data": "order"
}`
    }
  ];

  return <ApiIntegrationComponent sections={sections} href={'/guides/guides-list'} />;
};

export default PaymentIntegration;
