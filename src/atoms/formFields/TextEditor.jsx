import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [
      {
        color: ['#B91E35', '#F79C01', '#01712B', '#024EA8', '#6D1D82', '#DE2835']
      }
    ],
    ['link', 'image'],
    ['clean']
  ]
};

const TextEditor = ({ value, onChange, label = 'Body', placeholder = '', errorMessage = '', maxLength = 5000 }) => {
  return (
    <div className="mt-5">
      <label htmlFor="editor" className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <ReactQuill
        id="editor"
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
          errorMessage ? 'border-fadered focus:border-fadered' : ' border-primary focus:border-blue'
        } `}
        modules={modules}
        formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'color', 'link', 'image']}
      />
      <div className="flex items-center justify-end">
        <p className="text-sm text-gray-500 mt-2">
          {value.length}/{maxLength}
        </p>
      </div>
      {errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default TextEditor;
