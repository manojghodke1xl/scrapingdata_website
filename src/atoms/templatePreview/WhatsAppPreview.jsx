const WhatsAppPreview = ({ message, placeholders, className = '' }) => {
  const replacePlaceholders = (msg, values) => {
    return msg.replace(/\{(\w+)\}/g, (match, key) => values[key] || match);
  };

  const formatMessage = (msg) => {
    const formattedMessage = msg
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold (*text*)
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italic (_text_)
      .replace(/~(.*?)~/g, '<del>$1</del>') // Strikethrough (~text~)
      .replace(/`(.*?)`/g, '<code>$1</code>') // Monospace (`text`)
      .replace(/\n/g, '<br />'); // Newlines

    return { __html: formattedMessage };
  };

  return (
    <div className={`w-full flex flex-col items-start justify-start gap-5 ml-7 ${className}`}>
      <p>WhatsApp Template Preview:</p>

      {message ? (
        <div className="w-full justify-end flex h-fit font-normal whitespace-pre-wrap bg-gray-950 p-5">
          <div className="w-full h-fit bg-grey p-3 rounded-md" dangerouslySetInnerHTML={formatMessage(replacePlaceholders(message, placeholders))} />
        </div>
      ) : (
        <p className="font-normal">Add a template to see the preview</p>
      )}
    </div>
  );
};

export default WhatsAppPreview;
