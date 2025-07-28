// import { useRef, useEffect, useState } from 'react';
// import { FaRegImage } from 'react-icons/fa';
// import { showNotification } from '../../utils/showNotification';

// const ImageUpload = ({ label = 'Profile Picture', error, setErrors = () => {}, setDetails = () => {}, testimonialDetails = {}, fieldName = 'profilePictureFile' }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const allowedTypes = ['image/jpeg', 'image/png'];

//   // Dynamically determine the current field name
//   const currentField = testimonialDetails.profilePicture ? 'profilePicture' : 'profilePictureFile';

//   // Show either existing S3 URL or preview from file upload
//   const previewUrl = testimonialDetails?.[currentField]?.url || testimonialDetails?.[currentField];

//   useEffect(() => {
//     return () => {
//       if (selectedFile) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [selectedFile, previewUrl]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!allowedTypes.includes(file.type)) {
//       showNotification('warn', 'Only JPEG and PNG files are allowed');
//       return;
//     }

//     const preview = URL.createObjectURL(file);
//     setSelectedFile(file);

//     setDetails((prev) => ({
//       ...prev,
//       [fieldName]: { file, url: preview },
//       profilePicture: undefined // clear out the old one if re-uploading
//     }));

//     setErrors((prev) => ({ ...prev, [fieldName]: '' }));
//   };

//   const handleRemove = () => {
//     setSelectedFile(null);
//     setDetails((prev) => ({
//       ...prev,
//       [fieldName]: undefined,
//       profilePicture: undefined
//     }));
//   };

//   return (
//     <div className={`w-full border rounded-xl p-4 ${error ? 'border-red-500' : 'border-primary'}`}>
//       <label className="text-primary text-sm font-medium flex items-center gap-2 mb-2">
//         <FaRegImage className="text-2xl" /> Upload {label}
//       </label>

//       {previewUrl ? (
//         <div className="relative w-full flex justify-center">
//           <img src={previewUrl} alt="Preview" className="w-40 h-32 object-contain rounded-md" />
//           <button onClick={handleRemove} type="button" className="absolute top-0 right-0 text-red-500 bg-white p-1 rounded-full shadow" title="Remove">
//             ✕
//           </button>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center gap-2 text-center">
//           <input type="file" accept=".jpeg,.png" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
//           <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-hover">
//             Browse
//           </button>
//           <span className="text-xs text-gray-500">Accepted types: .jpeg, .png</span>
//         </div>
//       )}

//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//     </div>
//   );
// };

// export default ImageUpload;

// import { useRef, useEffect, useState } from 'react';
// import { FaRegImage } from 'react-icons/fa';
// import { showNotification } from '../../utils/showNotification';

// const ImageUpload = ({
//   label = 'Upload File',
//   fieldName = 'fileField',
//   error,
//   setErrors = () => {},
//   setDetails = () => {},
//   details = {},
//   acceptedTypes = ['image/jpeg', 'image/png'],
//   isImage = true,
//   isRemovable = true,
//   logo = <FaRegImage className="text-2xl text-primary" />
// }) => {
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const uploadedData = details?.[fieldName]?.url || details?.[fieldName];
//   const previewUrl = uploadedData?.url || (typeof uploadedData === 'string' ? uploadedData : null);
//   //   const previewUrl = testimonialDetails?.[currentField]?.url || testimonialDetails?.[currentField];

//   useEffect(() => {
//     return () => {
//       if (selectedFile && previewUrl?.startsWith('blob:')) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [selectedFile, previewUrl]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!acceptedTypes.includes(file.type)) {
//       showNotification('warn', `Only files of type: ${acceptedTypes.join(', ')} are allowed`);
//       return;
//     }

//     const blobPreview = URL.createObjectURL(file);
//     setSelectedFile(file);

//     setDetails((prev) => ({
//       ...prev,
//       [fieldName]: { file, url: blobPreview }
//     }));

//     setErrors((prev) => ({ ...prev, [fieldName]: '' }));
//   };

//   const handleRemove = () => {
//     setSelectedFile(null);
//     setDetails((prev) => ({ ...prev, [fieldName]: undefined }));
//   };

//   return (
//     <div className={`w-full border rounded-xl p-4 ${error ? 'border-red-500' : 'border-primary'}`}>
//       <label className="text-primary text-sm font-medium flex items-center gap-2 mb-2">
//         {logo} Upload {label}
//       </label>

//       {previewUrl ? (
//         <div className="relative w-full flex justify-center">
//           {isImage ? (
//             <img src={previewUrl} alt="Preview" className="w-40 h-32 object-contain rounded-md" />
//           ) : (
//             <video src={previewUrl} controls className="w-40 h-32 object-contain rounded-md" />
//           )}
//           {isRemovable && (
//             <button onClick={handleRemove} type="button" className="absolute top-0 right-0 text-red-500 bg-white p-1 rounded-full shadow" title="Remove">
//               ✕
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center gap-2 text-center">
//           <input type="file" accept={acceptedTypes.join(',')} onChange={handleFileChange} className="hidden" ref={fileInputRef} />
//           <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-hover">
//             Browse
//           </button>
//           <span className="text-xs text-gray-500">Accepted types: {acceptedTypes.join(', ')}</span>
//         </div>
//       )}

//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//     </div>
//   );
// };

// export default ImageUpload;
import { useRef, useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { showNotification } from '../../utils/showNotification';

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ImageUpload = ({
  label = 'Upload File',
  fieldName = 'fileField',
  error,
  setErrors = () => {},
  setDetails = () => {},
  details = {},
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  isImage = true,
  isRemovable = true,
  logo = <FaRegImage className="text-2xl text-primary" />
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadedData = details?.[fieldName]?.url || details?.[fieldName];
  const previewUrl = uploadedData?.url || (typeof uploadedData === 'string' ? uploadedData : null);

  useEffect(() => {
    return () => {
      if (selectedFile && previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedFile, previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      showNotification('warn', `Only files of type: ${acceptedTypes.join(', ')} are allowed`);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      showNotification('warn', `File size must be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    const blobPreview = URL.createObjectURL(file);
    setSelectedFile(file);

    setDetails((prev) => ({
      ...prev,
      [fieldName]: { file, url: blobPreview }
    }));

    setErrors((prev) => ({ ...prev, [fieldName]: '' }));
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setDetails((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  return (
    <div className={`w-full border rounded-xl p-4 ${error ? 'border-red-500' : 'border-primary'}`}>
      <label className="text-primary text-sm font-medium flex items-center gap-2 mb-2">
        {logo} Upload {label}
      </label>

      {previewUrl ? (
        <div className="relative w-full flex justify-center">
          {isImage ? (
            <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full " />
          ) : (
            <video src={previewUrl} controls className="w-40 h-32 object-contain rounded-md" />
          )}
          {isRemovable && (
            <button onClick={handleRemove} type="button" className="absolute top-0 right-0 text-red-500 bg-white p-1 rounded-full shadow" title="Remove">
              ✕
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <input type="file" accept={acceptedTypes.join(',')} onChange={handleFileChange} className="hidden" ref={fileInputRef} />
          <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-hover">
            Browse
          </button>
          <span className="text-xs text-gray-500">
            Accepted types: {acceptedTypes.join(', ')} <br />
            Max size: {MAX_FILE_SIZE_MB}MB <br />
            Ideal dimensions: 250px × 100px
          </span>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
