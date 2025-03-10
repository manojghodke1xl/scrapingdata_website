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

  const errMessage = whatsappData?.error?.error_data?.details || whatsappData?.error?.message;
  const formatMessage = (msg) => {
    if (!msg) return { __html: '' }; // Return empty content if msg is undefined

    const formattedMessage = msg
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold (*text*)
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italic (_text_)
      .replace(/~(.*?)~/g, '<del>$1</del>') // Strikethrough (~text~)
      .replace(/`(.*?)`/g, '<code>$1</code>') // Monospace (`text`)
      .replace(/\n/g, '<br />'); // Newlines

    return { __html: formattedMessage };
  };

  console.log('whatsappData', whatsappData);

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">WhatsApp Message Details</h2>
        <div className="text-gray-600">
          <p>
            <strong>From:</strong> {whatsappData?.fromNumber}
          </p>
          <p>
            <strong>To:</strong> {whatsappData?.toNumber}
          </p>
          <p>
            <strong>Status Code:</strong> {whatsappData?.statusCode}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(whatsappData?.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(whatsappData?.updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Message:</strong>
          </p>
          <div className="w-full justify-end flex h-fit font-normal whitespace-pre-wrap bg-gray-950 p-4 rounded-lg">
            <div className="w-full text-dark h-fit bg-grey p-3 rounded-md" dangerouslySetInnerHTML={formatMessage(whatsappData?.message)} />
          </div>
        </div>
        {whatsappData?.error && <p className="text-red-500 font-semibold">Error: {errMessage}</p>}
      </div>
    </div>
  );
};

export default WhatsappLogPreview;
