import { RxCross2 } from 'react-icons/rx';

const WhatsAppPreview = ({ message, placeholders, className = '', handleClosePreview }) => {
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
    <div className={`w-full flex flex-col items-start justify-start gap-5 border border-primary rounded-xl p-3  ${className}`}>
      <div className="flex flex-row items-center justify-between w-full">
        <p>WhatsApp Template Preview:</p>
        <button type="button" onClick={handleClosePreview} className="hover:bg-hover p-1 rounded-full">
          <RxCross2 strokeWidth={0.75} size={20} />
        </button>
      </div>

      {message ? (
        <div className="w-full justify-end flex h-fit font-normal whitespace-pre-wrap bg-gray-950 p-4 rounded-lg">
          <div className="w-full h-fit bg-grey p-3 rounded-md" dangerouslySetInnerHTML={formatMessage(replacePlaceholders(message, placeholders))} />
        </div>
      ) : (
        <p className="font-normal">Add a template to see the preview</p>
      )}
    </div>
  );
};

export default WhatsAppPreview;
