import { AiOutlineFileExcel, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileUnknown, AiOutlineFileWord } from 'react-icons/ai';

export const getFileIcon = (fileName) => {
  const extension = fileName?.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return <AiOutlineFilePdf className="text-danger text-2xl" />;
    case 'doc':
    case 'docx':
      return <AiOutlineFileWord className="text-brand text-2xl" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <AiOutlineFileExcel className="text-success text-2xl" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <AiOutlineFileImage className="text-pending text-2xl" />;
    default:
      return <AiOutlineFileUnknown className="text-secondary text-2xl" />;
  }
};
