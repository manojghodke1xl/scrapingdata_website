import { useEffect, useRef, useState } from 'react';
import { AiOutlineFilePdf, AiOutlineFileWord, AiOutlineFileExcel, AiOutlineFileImage } from 'react-icons/ai';
import { FaRegFile } from 'react-icons/fa';
import { FaEllipsisVertical } from 'react-icons/fa6';

const DocumentFileUpload = ({ divClassName, files, setFiles, label, isMultiple, toolTip, allowedTypes, allowedFileTypes, handleFileUpload, error }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [renameIndex, setRenameIndex] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const fileInputRef = useRef(null);
  const dropdownRefs = useRef([]);

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <AiOutlineFilePdf className="text-red-500 text-2xl" />;
      case 'doc':
      case 'docx':
        return <AiOutlineFileWord className="text-blue-500 text-2xl" />;
      case 'xls':
      case 'xlsx':
      case 'csv':
        return <AiOutlineFileExcel className="text-green-500 text-2xl" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <AiOutlineFileImage className="text-yellow-500 text-2xl" />;
      default:
        return <AiOutlineFilePdf className="text-gray-500 text-2xl" />;
    }
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
    setRenameIndex(null);
  };

  const handleRename = (index) => {
    setRenameIndex(index);
    setRenameValue(files[index].name);
    setDropdownIndex(null);
  };

  const saveRename = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].name = renameValue;
    setFiles(updatedFiles);
    setRenameIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current.every((ref, index) => index !== dropdownIndex || (ref && !ref.contains(event.target)))) setDropdownIndex(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownIndex]);

  return (
    <>
      <div className={`${divClassName} w-full border border-primary rounded-xl p-6 shadow-sm`}>
        <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
          <FaRegFile className="text-secondary text-2xl" strokeWidth={1.2} />
          {label || 'Upload'}
        </h1>

        <div className="border-2 border-primary rounded-xl text-center border-dashed p-3 w-auto">
          <p className="font-normal text-sm text-primary w-5/12 text-center m-auto">Choose {isMultiple ? 'files' : 'a file'} or drag and drop here to upload</p>

          <div className="flex items-center m-auto justify-center my-4">
            <input type="file" onChange={handleFileUpload} className="hidden" accept={`.${allowedTypes.join(', ')}`} ref={fileInputRef} multiple={isMultiple} />
            <div className="w-full flex justify-center">
              <button
                className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-gray-50 border-primary rounded-xl shadow-sm"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-primary">Browse</span>
              </button>
            </div>
          </div>

          <div className="font-normal text-xs text-primary text-center m-auto">{toolTip ? toolTip : `Accepted file types: ${allowedFileTypes.join(', ')}`}</div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="mt-5">
        {files.length > 0 && <h3 className="font-semibold text-gray-700 mb-2">Attached Documents</h3>}
        <ul>
          {files.map((file, index) => (
            <li key={index} className="flex flex-col border border-primary rounded-xl p-2 mb-2">
              {renameIndex === index ? (
                <div className="flex flex-col gap-2 p-4">
                  <label className="font-medium text-primary">Rename File</label>
                  <input type="text" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} className="p-2 px-4 border rounded-xl text-primary" />
                  <div className="flex gap-2 items-center justify-end mt-5">
                    <button onClick={() => setRenameIndex(null)} className="px-4 py-2 border border-primary text-primary rounded-xl">
                      Cancel
                    </button>
                    <button onClick={() => saveRename(index)} className="px-4 py-2 bg-primary text-white rounded-xl">
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.name)}
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(3)} KB</p>
                    </div>
                  </div>
                  <div className="relative" ref={(el) => (dropdownRefs.current[index] = el)}>
                    <FaEllipsisVertical className="text-gray-500 cursor-pointer text-xl" onClick={() => toggleDropdown(index)} />
                    {dropdownIndex === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => console.log('View clicked for', file.name)}>
                          View
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleRename(index)}>
                          Rename
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => setFiles(files.filter((_, fileIndex) => fileIndex !== index))}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DocumentFileUpload;
