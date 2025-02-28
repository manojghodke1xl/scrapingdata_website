import { useEffect, useRef, useState } from 'react';
import { FaRegFile } from 'react-icons/fa';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { showNotification } from '../../utils/showNotification';
import { updateFileNameApi } from '../../apis/file-apis';
import { getFileIcon } from '../../constants/FileIcon';

const DocumentFileUpload = ({
  divClassName,
  files,
  existingFiles = [],
  setFiles,
  setExistingFiles,
  label,
  isMultiple,
  toolTip,
  allowedTypes,
  allowedFileTypes,
  handleFileUpload,
  error
}) => {
  const fileInputRef = useRef(null);
  const dropdownRefs = useRef([]);
  const existingDropdownRefs = useRef([]);
  const dropZoneRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dropdownIndexState, setDropdownIndexState] = useState({
    current: null,
    previous: null
  });

  const [renameState, setRenameState] = useState({
    current: { val: '', index: null },
    previous: { val: '', index: null }
  });

  const toggleDropdown = (index) => {
    setDropdownIndexState((prev) => ({ ...prev, current: prev.current === index ? null : index }));
    setRenameState((prev) => ({ ...prev, current: { val: '', index: null } }));
  };

  const toggleExistingDropdown = (index) => {
    setDropdownIndexState((prev) => ({ ...prev, previous: prev.previous === index ? null : index }));
    setRenameState((prev) => ({ ...prev, previous: { val: '', index: null } }));
  };

  const handleRename = (index) => {
    setRenameState((prev) => ({ ...prev, current: { val: files[index].customName, index: index } }));
    setDropdownIndexState((prev) => ({ ...prev, current: null }));
  };

  const handleExistingRename = (index) => {
    setRenameState((prev) => ({ ...prev, previous: { val: existingFiles[index].name, index: index } }));
    setDropdownIndexState((prev) => ({ ...prev, previous: null }));
  };

  const saveRename = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].customName = renameState.current.val;
    setFiles(updatedFiles);
    setRenameState((prev) => ({ ...prev, current: { val: '', index: null } }));
    showNotification('success', 'File name updated successfully');
  };

  const handleExistingSaveRename = async (index) => {
    let updatedFiles = [...existingFiles];
    updatedFiles[index].name = renameState.previous.val;
    const id = updatedFiles[index]._id;

    try {
      const { status, data } = await updateFileNameApi(id, renameState.previous.val);
      if (status) {
        showNotification('success', data.message);
        setExistingFiles((prev) => ({ ...prev, attachments: updatedFiles }));
        setRenameState((prev) => ({ ...prev, previous: { val: '', index: null } }));
      } else showNotification('error', data.message);
    } catch (error) {
      showNotification('error', error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current.every((ref, index) => index !== dropdownIndexState.current || (ref && !ref.contains(event.target))))
        setDropdownIndexState((prev) => ({ ...prev, current: null }));
      if (existingDropdownRefs.current.every((ref, index) => index !== dropdownIndexState.previous || (ref && !ref.contains(event.target))))
        setDropdownIndexState((prev) => ({ ...prev, previous: null }));
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownIndexState]);

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
      const event = { target: { files: droppedFiles } };
      handleFileUpload(event);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className={`${divClassName} w-full border ${error ? 'border-danger focus:border-fadered' : 'border-primary focus:border-secondary'}  rounded-xl p-6 shadow-sm`}>
        <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
          <FaRegFile className="text-secondary text-2xl" strokeWidth={1.2} />
          {label || 'Upload'}
        </h1>

        <div
          ref={dropZoneRef}
          className={`border-2 border-primary rounded-xl text-center border-dashed p-3 w-auto transition-colors duration-200 
            ${isDragging ? 'bg-primary/10 border-primary' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="font-normal text-sm text-primary w-5/12 text-center m-auto">
            {isDragging ? 'Drop files here' : `Choose ${isMultiple ? 'files' : 'a file'} or drag and drop here to upload`}
          </p>

          <div className="flex items-center m-auto justify-center my-4">
            <input type="file" onChange={(e) => handleFileUpload(e)} className="hidden" accept={`.${allowedTypes.join(', ')}`} ref={fileInputRef} multiple={isMultiple} />
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
        {error && <p className="text-danger text-sm mt-2">{error}</p>}
      </div>

      <div>
        {files.length > 0 && <h3 className="font-semibold text-primary mb-2">Attached Documents</h3>}
        <ul>
          {existingFiles.map((file, index) => (
            <li key={index} className="flex flex-col border border-primary rounded-xl p-2 mb-2">
              {renameState.previous.index === index ? (
                <div className="flex flex-col gap-2 p-4">
                  <label className="font-medium text-primary">Rename File</label>
                  <input
                    type="text"
                    value={renameState.previous.val}
                    onChange={(e) => setRenameState((prev) => ({ ...prev, previous: { val: e.target.value, index: index } }))}
                    className="p-2 px-4 border rounded-xl text-primary bg-inherit"
                  />
                  <div className="flex gap-2 items-center justify-end mt-5">
                    <button
                      onClick={() => setRenameState((prev) => ({ ...prev, previous: { val: '', index: null } }))}
                      className="px-4 py-2 border border-primary text-primary rounded-xl"
                    >
                      Cancel
                    </button>
                    <button onClick={() => handleExistingSaveRename(index)} className="px-4 py-2 bg-primary text-white rounded-xl">
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.name)}
                    <div>
                      <p className="text-sm font-medium text-primary">{file.name}</p>
                      <p className="text-xs text-secondary">{(file.size / 1024).toFixed(3)} KB</p>
                    </div>
                  </div>
                  <div className="relative" ref={(el) => (existingDropdownRefs.current[index] = el)}>
                    <FaEllipsisVertical className="text-secondary cursor-pointer text-xl" onClick={() => toggleExistingDropdown(index)} />
                    {dropdownIndexState.previous === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-main border border-primary rounded-md shadow-lg z-10">
                        {/* <button
                          className="block w-full text-left px-4 py-2 text-sm text-secondary hover:bg-hover"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.url, '_blank');
                          }}
                        >
                          View
                        </button> */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-secondary hover:bg-hover" onClick={() => handleExistingRename(index)}>
                          Rename
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-hover"
                          onClick={() => setExistingFiles((prev) => ({ ...prev, attachments: prev.attachments.filter((f) => f._id !== file._id) }))}
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
          {files.map((file, index) => (
            <li key={index} className="flex flex-col border border-primary rounded-xl p-2 mb-2">
              {renameState.current.index === index ? (
                <div className="flex flex-col gap-2 p-4">
                  <label className="font-medium text-primary">Rename File</label>
                  <input
                    type="text"
                    value={renameState.current.val}
                    onChange={(e) => setRenameState((prev) => ({ ...prev, current: { val: e.target.value, index } }))}
                    className="p-2 px-4 border rounded-xl text-primary bg-inherit"
                  />
                  <div className="flex gap-2 items-center justify-end mt-5">
                    <button
                      onClick={() => setRenameState((prev) => ({ ...prev, current: { val: '', index: null } }))}
                      className="px-4 py-2 border border-primary text-primary rounded-xl"
                    >
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
                    {getFileIcon(file.customName)}
                    <div>
                      <p className="text-sm font-medium">{file.customName}</p>
                      {file.file.size && <p className="text-xs text-secondary">{(file.file.size / 1024).toFixed(3)} KB</p>}
                    </div>
                  </div>
                  <div className="relative" ref={(el) => (dropdownRefs.current[index] = el)}>
                    <FaEllipsisVertical className="text-secondary cursor-pointer text-xl" onClick={() => toggleDropdown(index)} />
                    {dropdownIndexState.current === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-main border border-primary rounded-md shadow-lg z-10">
                        {/* <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-hover" onClick={() => console.log('View clicked for', file.name)}>
                          View
                        </button> */}
                        <button className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-hover" onClick={() => handleRename(index)}>
                          Rename
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-hover"
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
    </div>
  );
};

export default DocumentFileUpload;
