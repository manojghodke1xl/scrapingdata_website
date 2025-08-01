import { useState, useRef } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { showNotification } from '../../utils/showNotification';

const MultipleImageUpload = ({
  label = 'Upload Images',
  error,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  isRemovable = true,
  maxFileSizeInMB = 1,
  isMultiple = true,
  selected = { imageFile: [] },
  onChange = () => {},
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

  // Validate and filter files
  const validateFiles = (files) => {
    const validFiles = [];
    for (const file of files) {
      if (!acceptedTypes.includes(file.type)) {
        showNotification('warn', `Only files of type: ${acceptedTypes.join(', ')} are allowed`);
        continue;
      }
      if (file.size > maxFileSizeInBytes) {
        showNotification('warn', `File size must be less than ${maxFileSizeInMB}MB`);
        continue;
      }
      const url = URL.createObjectURL(file);
      validFiles.push({ file, url });
    }
    return validFiles;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = validateFiles(files);
    if (validFiles.length) {
      // Pass only updated imageFile array to parent
      onChange([...selected.imageFile, ...validFiles]);
    }
    e.target.value = '';
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    if (validFiles.length) {
      onChange([...selected.imageFile, ...validFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle image removal inside child
 const handleRemove = (url) => {
  const fileToRemove = selected.imageFile.find((f) => f.url === url);

  if (fileToRemove?.url?.startsWith('blob:')) {
    URL.revokeObjectURL(fileToRemove.url);
  }

  const updatedFiles = selected.imageFile.filter((f) => f.url !== url);
  onChange(updatedFiles);
};

  // useEffect(() => {
  //   return () => {
  //     selected.imageFile.forEach((f) => {
  //       if (f?.url?.startsWith('blob:')) URL.revokeObjectURL(f.url);
  //     });
  //   };
  // }, [selected.imageFile]);

  return (
    <div className={`w-full border rounded-xl p-6 shadow-sm ${error ? 'border-danger' : 'border-primary focus:border-secondary'}`}>
      <h1 className="text-primary text-lg mb-3 flex items-center gap-2">
        <FaRegImage className="text-2xl text-primary" /> Upload {label}
      </h1>

      {/* Drag and drop functionality implemented to div */}
      <div
        className={`border-2 ${isDragging ? 'border-secondary bg-gray-50' : 'border-primary'} rounded-xl text-center border-dashed p-4`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={acceptedTypes.join(',')}
          multiple={isMultiple}
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />

        {/* Previewing image - if files are selected then then show files otherwise show browse option */}
        {selected.imageFile.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {selected.imageFile.map((f, idx) => (
              <div key={idx} className="relative w-32 h-32">
                <img src={f.url} alt={`Preview ${idx}`} className="rounded-xl w-full h-full object-contain" />
                {isRemovable && (
                  <button onClick={() => handleRemove(f.url)} type="button" className="absolute top-0 right-0" title="Remove File">
                    <IoCloseOutline className="text-primary text-xl bg-main rounded-full p-1" size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="font-normal text-sm text-primary mb-2">{isDragging ? 'Drop here' : 'Choose or drag and drop images to upload'}</p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-hover border-primary rounded-xl shadow-sm"
            >
              Browse Images
            </button>
            <p className="text-xs text-primary mt-2">
              Accepted types: {acceptedTypes.join(', ')} <br />
              Max size: {maxFileSizeInMB}MB
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-5 mx-auto font-normal text-xs text-primary">
        <span>Maximum file size: {maxFileSizeInMB}MB</span>
        <span>Ideal dimensions: 250px x 100px</span>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default MultipleImageUpload;