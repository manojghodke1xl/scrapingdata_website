import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import { getMethodCall } from '../../apis/api-handler';

const EmailLogPreview = () => {
  const { id } = useParams();
  const [emailData, setEmailData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getMethodCall(`${import.meta.env.VITE_API_URL}/logs/email/${id}`);

      if (!status) return showNotification('error', data);

      console.log('data.log', data.log);
      setEmailData(data?.log);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{emailData.subject}</h2>
          <p className="text-sm text-gray-500">{new Date(emailData.createdAt).toLocaleString()}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>From:</strong> {emailData.from}
          </p>
          <p>
            <strong>To:</strong> {emailData.to}
          </p>
          <p className="font-semibold">
            <strong>Status:</strong> {emailData.statusCode === 200 ? 'Delivered' : 'Failed'}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Message:</h3>
          <div className="mt-2 p-4 border rounded bg-gray-100" dangerouslySetInnerHTML={{ __html: emailData.message }} />
        </div>
      </div>
    </div>
  );
};

export default EmailLogPreview;
