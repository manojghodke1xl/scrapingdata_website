import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import { getMethodCall } from '../../apis/api-handler';
import { CiImport } from 'react-icons/ci';

const EmailLogPreview = () => {
  const { id } = useParams();
  const [emailData, setEmailData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getMethodCall(`${import.meta.env.VITE_API_URL}/logs/email/${id}`);
      if (!status) return showNotification('error', data);
      setEmailData(data?.log);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto my-8 mb-20">
      <div className="max-w-2xl mx-auto bg-inherit shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">{emailData.subject}</h2>
          <p className="text-sm text-primary">{new Date(emailData.createdAt).toLocaleString()}</p>
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

        {emailData.attachments && emailData?.attachments?.length > 0 && (
          <div className="flex flex-col my-4">
            <strong>Download Attachments:</strong>
            {emailData.attachments.map((attachment, i) => (
              <div key={i} className="flex justify-between px-4 items-center my-1 border border-primary p-2 rounded-xl">
                <p className="mr-4">{attachment.filename}</p>
                <a href={attachment.href} download>
                  <CiImport strokeWidth={0.5} className="text-2xl" />
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold">Message:</h3>
          <div className="mt-2 p-4 border rounded bg-gray-100" dangerouslySetInnerHTML={{ __html: emailData.message }} />
        </div>
      </div>
    </div>
  );
};

export default EmailLogPreview;
