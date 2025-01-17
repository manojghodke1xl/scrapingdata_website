import ReactQuill from 'react-quill';

const TextEditor = ({ value, onChange, label = 'Body', placeholder = '', maxLength = 5000, modules, formats }) => {
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
        className="rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        modules={modules}
        formats={formats}
      />
      <div className="flex items-center justify-end">
        <p className="text-sm text-gray-500 mt-2">
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
};

TextEditor.defaultProps = {
  modules: {
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
  },
  formats: ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'color', 'link', 'image']
};

export default TextEditor;
