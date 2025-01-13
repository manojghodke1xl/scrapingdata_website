import { useEffect, useRef, useState, useMemo } from 'react';
import { uploadMultipleFiles } from '../../utils/fileUploads';
import { showNotification } from '../../utils/showNotification';
import { FaRegEdit, FaRegImage } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import TruncatableFieldModal from '../modal/TruncatableFeildModel';
import { CiExport } from 'react-icons/ci';

const MultipleFileUpload = ({
  divClassName,
  imagePreviewUrl: externalImagePreviewUrl,
  onUploadSuccess,
  id,
  label,
  allowedTypes,
  allowedFileTypes,
  isImage = false,
  isMultiple = false,
  setLoading,
  error
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Memoize the imagePreviews calculation
  const imagePreviews = useMemo(() => {
    if (externalImagePreviewUrl) return [externalImagePreviewUrl];
    return selectedFiles.map((file) => URL.createObjectURL(file));
  }, [externalImagePreviewUrl, selectedFiles]);

  // Cleanup object URLs when component unmounts or dependencies change
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview && !preview.includes('http')) URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) showNotification('warn', `Some files were skipped. Accepted file types: ${allowedFileTypes.join(', ')}`);
    if (validFiles.length > 0) {
      setLoading(true);
      try {
        const fileIds = await uploadMultipleFiles(validFiles);
        if (onUploadSuccess) {
          if (!id) onUploadSuccess(fileIds);
          else onUploadSuccess(fileIds[0]);
        }
        const newFiles = isMultiple ? [...selectedFiles, ...validFiles] : [validFiles[0]];
        setSelectedFiles(newFiles);
      } catch (error) {
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={`${divClassName} w-full border border-primary rounded-xl p-6 shadow-sm`}>
      <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
        {isImage ? <FaRegImage className="text-primary text-2xl" /> : <CiExport className="text-primary text-2xl" strokeWidth={1.2} />}
        {label || 'Upload'}
      </h1>

      <div className="border-2 border-primary rounded-xl text-center border-dashed p-3 w-auto">
        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative p-2">
                <img src={preview} alt={`Preview ${index + 1}`} className="rounded-xl w-full h-32 object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => fileInputRef.current.click()}>
                    <FaRegEdit className="text-primary text-xl bg-white rounded-full p-1" />
                  </button>
                  {isMultiple && (
                    <button onClick={() => handleDelete(index)}>
                      <IoCloseOutline className="text-primary text-xl bg-white rounded-full p-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isMultiple && (
              <>
                <input type="file" onChange={handleFileChange} className="hidden" accept=".png,.jpeg,.svg,.gif" ref={fileInputRef} multiple={isMultiple} />
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-primary rounded-xl cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <span className="text-primary">+ Add More</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <p className="font-normal text-sm text-primary w-5/12 text-center m-auto">Choose {isMultiple ? 'files' : 'a file'} or drag and drop here to upload</p>

            <div className="flex items-center m-auto justify-center my-4">
              <input type="file" onChange={handleFileChange} className="hidden" accept={`.${allowedFileTypes.join(', ')}`} ref={fileInputRef} multiple={isMultiple} />
              <div className="w-full flex justify-center">
                <button
                  className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-gray-50 border-primary rounded-xl shadow-sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span className="text-primary">Browse</span>
                </button>
              </div>
            </div>

            <p className="font-normal text-xs text-primary text-center m-auto">
              <TruncatableFieldModal title={'Accepted file types'} content={`Accepted file types: ${allowedFileTypes.join(', ')}`} maxLength={85} />
            </p>
          </div>
        )}
      </div>

      {/* File information and constraints */}
      <div className="flex justify-between mt-5 mx-auto font-normal text-xs text-primary">
        <span>Maximum file size: 1MB</span>
        <span>Ideal dimensions: 250px x 100px</span>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default MultipleFileUpload;
