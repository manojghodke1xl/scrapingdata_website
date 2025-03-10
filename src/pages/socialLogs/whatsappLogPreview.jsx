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

  

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-lg mx-auto bg-main text-dark shadow-lg rounded-lg p-6 border border-primary space-y-2">
        <h2 className="text-xl font-semibold text-dark mb-4">WhatsApp Message Details</h2>
        <div className="text-dark">
          <p className="font-normal text-secondary">
            <span className="font-semibold text-dark">From:</span> {whatsappData?.fromNumber}
          </p>
          <p className="font-normal text-secondary">
            <span className="font-semibold text-dark">To:</span> {whatsappData?.toNumber}
          </p>
          <p className="font-normal text-secondary">
            <span className="font-semibold text-dark">Status Code:</span> {whatsappData?.statusCode}
          </p>
          <p className="font-normal text-secondary">
            <span className="font-semibold text-dark">Created At:</span> {new Date(whatsappData?.createdAt).toLocaleString()}
          </p>
          <p className="font-normal text-secondary">
            <span className="font-semibold text-dark">Updated At:</span> {new Date(whatsappData?.updatedAt).toLocaleString()}
          </p>
          <p className="font-normal text-secondary">
            <span className="font-semibold text-dark">Message:</span>
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
