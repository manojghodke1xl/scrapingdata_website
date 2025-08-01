import { useRef, useEffect, useState, useCallback } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { showNotification } from '../../utils/showNotification';
import { IoIosDocument } from "react-icons/io";

const ImageUpload = ({
  label = 'Upload Image',
  fieldName = 'fileField',
  error,
  setErrors = () => { },
  setDetails = () => { },
  details = {},
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  allowedFileTypes = [],
  isImage,
  isVideo,
  isDocument,
  isRemovable = true,
  logo = <FaRegImage className="text-2xl text-primary" />,
  maxFileSizeInMB,
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
  const uploadedData = details?.[fieldName]?.url || details?.[fieldName];
  const previewUrl = uploadedData?.url || (typeof uploadedData === 'string' ? uploadedData : null);

  useEffect(() => {
    return () => {
      if (selectedFile && previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedFile, previewUrl]);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;

      if (!acceptedTypes.includes(file.type)) {
        showNotification('warn', `Only files of type: ${acceptedTypes.join(', ')} are allowed`);
        return;
      }

      if (file.size > maxFileSizeInBytes) {
        showNotification('warn', `File size must be less than ${maxFileSizeInMB}MB`);
        return;
      }

      const blobPreview = URL.createObjectURL(file);
      setSelectedFile(file);

      setDetails((prev) => ({
        ...prev,
        [fieldName]: { file, url: blobPreview }
      }));

      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    },
    [acceptedTypes, fieldName, setDetails, setErrors]
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setDetails((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`w-full border rounded-xl p-6 shadow-sm ${error ? 'border-danger focus:border-fadered' : 'border-primary focus:border-secondary'}`}
    >
      <h1 className="text-primary text-lg mb-3 flex items-center gap-2">
        {logo} Upload {label}
      </h1>

      <div
        className={`border-2 ${isDragging ? 'border-secondary bg-gray-50' : 'border-primary'} rounded-xl text-center border-dashed p-4`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />

        {previewUrl ? (
          <div className="flex justify-center items-center relative w-full">

            {/* If it is image */}
            {isImage &&
              <img src={previewUrl} alt="Preview" className="rounded-xl w-3/5 h-32 object-contain mx-auto" />
            }

            {/* If it is video */}
            {isVideo &&
              <video
                src={previewUrl}
                className="rounded-xl w-3/5 h-32 object-contain mx-auto"
              >
                Your browser does not support the video tag.
              </video>
            }

            {/* If it is document */}
            {isDocument &&
              <IoIosDocument
                size={104}
                className="mx-auto"
                title="Document preview"
              />}

            {isRemovable && (
              <button
                onClick={handleRemove}
                type="button"
                className="absolute top-0 right-20"
                title="Remove File"
              >
                <IoCloseOutline className="text-primary text-xl bg-main rounded-full p-1" size={30} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="font-normal text-sm text-primary mb-2">
              {isDragging ? 'Drop here' : 'Choose or drag and drop here to upload'}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-hover border-primary rounded-xl shadow-sm"
            >
              Browse
            </button>
            <p className="text-xs text-primary mt-2">
              {/* Accepted types: {acceptedTypes.join(', ')} <br /> */}
              {/* To display file types if allowedFileTypes is not empty */}
              {allowedFileTypes?.length > 0
                ? `Accepted types: ${allowedFileTypes.join(', ')}`
                : `Accepted types: ${acceptedTypes.join(', ')}`}
              <br />
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

export default ImageUpload;
