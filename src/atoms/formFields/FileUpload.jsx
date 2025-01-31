import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { uploadFile } from '../../utils/fileUploads';
import { showNotification } from '../../utils/showNotification';
import { MdOutlineUploadFile } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { BsFilePdf } from 'react-icons/bs';

const FileUpload = ({
  divClassName,
  label,
  logo,
  imagePreviewUrl: externalImagePreviewUrl,
  error,
  setErrors,
  acceptedTypes,
  isImage = false,
  isPdf = false,
  isVideo = false,
  isSvg = false,
  setDetails = () => {},
  fieldName = 'image',
  uploadToAWS = true
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // Use the external `imagePreviewUrl` if passed, else fallback to selectedFile preview.
  const imagePreview = externalImagePreviewUrl || (selectedFile ? URL.createObjectURL(selectedFile) : null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (uploadToAWS) uploadFile({ file, isImage, isPdf, isVideo, setDetails, fieldName });
      else {
        console.log('file', file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const decoder = new TextDecoder('utf-8');
          const fileText = decoder.decode(fileContent);
          console.log('fileContent', fileContent);
          setDetails((prev) => ({
            ...prev,
            [fieldName]: {
              name: file.name,
              size: file.size,
              type: file.type,
              text: fileText,
              fileData: fileContent
            }
          }));
        };
        reader.readAsArrayBuffer(file);
      }
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    } else {
      showNotification('warn', `Accepted file types: ${acceptedTypes.join(', ')}`);
      setSelectedFile(null);
    }
  };

  const renderPreview = () => {
    if (!imagePreview) return null;

    if (isImage) {
      if (isSvg) {
        return <svg className="rounded-xl flex justify-center m-auto w-3/5 h-full object-contain" dangerouslySetInnerHTML={{ __html: imagePreview }} />;
      }
      return <img src={imagePreview} alt={selectedFile?.name || 'Image Preview'} className="rounded-xl flex justify-center m-auto w-3/5 h-32 object-contain" />;
    }

    if (isVideo) {
      return (
        <video src={imagePreview} controls className="rounded-xl flex justify-center m-auto w-3/5 h-32">
          Your browser does not support the video tag.
        </video>
      );
    }

    if (isPdf) {
      return (
        <div className="flex items-center justify-center gap-2 w-3/5 m-auto">
          <BsFilePdf className="text-primary text-4xl" />
          <span className="text-primary text-sm truncate">{selectedFile?.name || 'PDF Document'}</span>
        </div>
      );
    }
  };

  return (
    <>
      <div className={`${divClassName} w-full border border-primary rounded-xl p-6 shadow-sm`}>
        <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
          {logo || <MdOutlineUploadFile className="text-primary text-2xl" />}
          Upload {isImage ? label || 'Image' : isPdf ? label || 'PDF' : isVideo ? label || 'Video' : label || 'File'}
        </h1>

        <div className="border-2 border-primary rounded-xl text-center border-dashed p-3 w-auto">
          {imagePreview ? (
            <div className="flex gap-1 justify-between relative p-2">
              {renderPreview()}
              <div className="px-1">
                <button onClick={() => setSelectedFile(null)} className="absolute top-0 right-20" title="Remove File" type="button">
                  <IoCloseOutline className="text-primary text-xl bg-white rounded-full p-1" size={30} />
                </button>
                <input type="file" onChange={handleFileChange} className="hidden" accept={acceptedTypes.join(', ')} ref={fileInputRef} />
                <Link onClick={() => fileInputRef.current.click()}>
                  <FaRegEdit className="text-primary text-xl" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-normal text-sm text-primary w-5/12 text-center m-auto">Choose a file or drag and drop here to upload</p>

              <div className="flex items-center m-auto justify-center  my-4 ">
                <input type="file" onChange={handleFileChange} className="hidden" accept={acceptedTypes.join(', ')} ref={fileInputRef} />
                <div className="w-full flex justify-center">
                  <Link
                    to="#"
                    className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-gray-50 border-primary rounded-xl shadow-sm"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <span className="text-primary">Browse</span>
                  </Link>
                </div>
              </div>

              <p className="font-normal text-xs text-primary text-center m-auto">Accepted file types: {acceptedTypes.join(', ')}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-5 mx-auto font-normal text-xs text-primary">
          <span>Maximum file size: 1MB</span>
          <span>Ideal dimensions: 250px x 100px</span>
        </div>
        {/* {showPopup && selectedFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
            <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-8">
              <div className="w-full flex justify-center items-center">
                <div className="flex justify-between w-full mb-4">
                  <h4 className="w-full text-black font-semibold text-xl text-left">Uploaded Logo File</h4>
                  <IoCloseOutline className="text-primary text-2xl" onClick={() => setShowPopup(false)} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 border border-primary rounded-xl py-2 px-4">
                  <div className="flex flex-col">
                    <span className="text-primary text-sm font-normal">{selectedFile.name}</span>
                    <span className="text-secondary text-xs font-normal">{formatFileSize(selectedFile.size)}</span>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={handleDownload}>
                      <MdOutlineFileDownload className="text-primary text-xl" />
                    </button>

                    <button onClick={handleDelete}>
                      <RiDeleteBin5Line className="text-primary text-xl" />
                    </button>
                  </div>
                </div>

                <p className="text-primary text-sm font-normal">File uploaded successfully.</p>
              </div>

              <div className="w-full mt-4 flex">
                <button onClick={() => setShowPopup(false)} className="px-4 py-2 w-full text-center text-white font-medium rounded-xl whitespace-nowrap bg-primary hover:bg-hover">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )} */}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
};

export default FileUpload;
