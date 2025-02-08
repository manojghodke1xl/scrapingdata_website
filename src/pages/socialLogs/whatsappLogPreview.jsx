import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import { getMethodCall } from '../../apis/api-handler';

const WhatsappLogPreview = () => {
  const { id } = useParams();
  const [whatsappData, setWhatsappData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getMethodCall(`${import.meta.env.VITE_API_URL}/logs/whatsapp/${id}`);

      if (!status) return showNotification('error', data);

      setWhatsappData(data?.log);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">WhatsApp Message Details</h2>
        <div className="text-gray-600">
          <p>
            <strong>From:</strong> {whatsappData.fromNumber}
          </p>
          <p>
            <strong>To:</strong> {whatsappData.toNumber}
          </p>
          <p>
            <strong>Status Code:</strong> {whatsappData.statusCode}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(whatsappData.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(whatsappData.updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Message:</strong>
          </p>
          <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded-md text-sm">{whatsappData.message}</pre>
        </div>
      </div>
    </div>
  );
};

export default WhatsappLogPreview;
