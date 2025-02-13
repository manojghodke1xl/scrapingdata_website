import React from 'react';

const EmailPreview = ({ emailTemplate }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-5 ml-7">
      <p>Email Template Preview:</p>
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
