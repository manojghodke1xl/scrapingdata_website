import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const EmailPreview = ({ emailTemplate, handleClosePreview }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start ">
      <div className="flex flex-row items-center justify-between w-full">
        <p>Email Template Preview:</p>
        <button type="button" onClick={handleClosePreview} className="hover:bg-hover p-1 rounded-full">
          <RxCross2 strokeWidth={0.75} size={20} />
        </button>
      </div>
      {emailTemplate.subject && (
        <h2 className="text-lg font-semibold text-dark mb-4">
          <span className="font-normal text-md">Subject:</span> {emailTemplate.subject}
        </h2>
      )}
      {emailTemplate.body ? (
        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: emailTemplate.body }} />
      ) : (
        <p className="font-normal">Add a template to see the preview</p>
      )}
    </div>
  );
};

export default EmailPreview;
