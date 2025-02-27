import { useRef, useState } from 'react';
import { uploadMultipleFiles } from '../../utils/fileUploads';
import { showNotification } from '../../utils/showNotification';
import { FaRegImage } from 'react-icons/fa';
import { CiExport } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { getFileIcon } from '../../constants/FileIcon';

const MultipleFileUpload = ({
  divClassName,
  onUploadSuccess,
  onRemoveFile,
  selected = [],
  label,
  allowedTypes,
  allowedFileTypes,
  toolTip,
  isImage = false,
  isMultiple = false,
  setLoading,
  error
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => allowedTypes.includes(file.type));
    const invalidFiles = fileArray.filter((file) => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) showNotification('warn', `Some files were skipped. Accepted file types: ${allowedFileTypes.join(', ')}`);

    if (validFiles.length > 0) {
      setLoading(true);
      try {
        const files = await uploadMultipleFiles(validFiles);
        const fileIds = files.map((file) => file._id);
        setSelectedFiles((prev) => [...prev, ...files]);
        if (onUploadSuccess) onUploadSuccess(fileIds);
      } catch (error) {
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleDelete = (id) => {
    setSelectedFiles((prev) => prev.filter((file) => file._id !== id));
    onRemoveFile(id);
  };

  return (
    <>
      <div className={`${divClassName} w-full border  ${error ? 'border-danger' : 'border-primary'} rounded-xl p-6 shadow-sm`}>
        <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
          {isImage ? <FaRegImage className="text-primary text-2xl" /> : <CiExport className="text-primary text-2xl" strokeWidth={1.2} />}
          {label || 'Upload'}
        </h1>

        <div
          ref={dropZoneRef}
          className={`border-2 border-primary rounded-xl text-center border-dashed p-3 w-auto transition-colors duration-200 ${isDragging ? 'bg-primary/10 border-primary' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div>
            <p className="font-normal text-sm text-primary w-5/12 text-center m-auto">
              {isDragging ? 'Drop files here' : `Choose ${isMultiple ? 'files' : 'a file'} or drag and drop here to upload`}
            </p>

            <div className="flex items-center m-auto justify-center my-4">
              <input type="file" onChange={handleFileChange} className="hidden" accept={`.${allowedTypes.join(', ')}`} ref={fileInputRef} multiple={isMultiple} />
              <div className="w-full flex justify-center">
                <button
                  className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-hover border-primary rounded-xl shadow-sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span className="text-primary">Browse</span>
                </button>
              </div>
            </div>

            <div className="font-normal text-xs text-primary text-center m-auto">{toolTip ? toolTip : `Accepted file types: ${allowedFileTypes.join(', ')}`}</div>
          </div>
        </div>

        {/* File information and constraints */}
        <div className="flex justify-between mt-5 mx-auto font-normal text-xs text-primary">
          <span>Maximum file size: 1MB</span>
          <span>Ideal dimensions: 250px x 100px</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div>
        {selected.length > 0 &&
          selected.map((selected) => (
            <div key={selected?._id} className="flex justify-between items-center border border-primary p-2 rounded-xl mb-2">
              <div
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const previewUrl = `${selected?.url}`;
                  window.open(previewUrl, '_blank');
                }}
              >
                {getFileIcon(selected?.name)}
                <div>
                  <p className="text-sm font-medium">{selected?.name.replace(/vista-group\//g, '')}</p>
                </div>
              </div>

              <div>
                <MdDeleteForever className="text-2xl text-danger cursor-pointer" onClick={() => handleDelete(selected?._id)} />
              </div>
            </div>
          ))}

        {selectedFiles.map((file, index) => (
          <li key={index} className="flex flex-col border border-primary rounded-xl p-2 mb-2">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const previewUrl = `${file.url}${file.fields.key}?response-content-disposition=inline`;
                  window.open(previewUrl, '_blank');
                }}
              >
                {getFileIcon(file.fields.key)}
                <div>
                  <p className="text-sm font-medium">{file.fields.key.replace(/vista-group\//g, '')}</p>
                </div>
              </div>

              <div>
                <MdDeleteForever className="text-2xl text-danger cursor-pointer" onClick={() => handleDelete(file._id)} />
              </div>
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default MultipleFileUpload;
