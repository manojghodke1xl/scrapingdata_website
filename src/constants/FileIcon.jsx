import { AiOutlineFileExcel, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileUnknown, AiOutlineFileWord, AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { MdDeleteForever, MdEdit, MdOutlineApps, MdOutlineInventory2, MdRemoveRedEye, MdSend } from 'react-icons/md';

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

export const getTableActionIcons = (icon) => {
  switch (icon) {
    case 'edit':
      return <MdEdit />;
    case 'delete':
      return <MdDeleteForever />;
    case 'view':
      return <MdRemoveRedEye />;
    case 'copy':
      return <FiCopy />;
    case 'apps':
      return <MdOutlineApps />;
    case 'managePackage':
      return <MdOutlineInventory2 />;

    case 'send':
      return <MdSend />;
    default:
      return <AiOutlineQuestionCircle />;
  }
};
