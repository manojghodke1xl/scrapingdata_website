import { AiOutlineFileExcel, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileUnknown, AiOutlineFileWord, AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { MdDeleteForever, MdEdit, MdOutlineApps, MdOutlineInventory2, MdRemoveRedEye, MdSend } from 'react-icons/md';

/**
 * Get the icon for a file based on its extension
 * @param {string} fileName - The name of the file
 * @returns {ReactElement} - The icon for the file
 */
export const getFileIcon = (fileName) => {
  const extension = fileName?.split('.').pop().toLowerCase();
  switch (extension) {
    // Microsoft Word Document
    case 'doc':
    case 'docx':
      return <AiOutlineFileWord className="text-brand text-2xl" />;

    // Microsoft Excel Document
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <AiOutlineFileExcel className="text-success text-2xl" />;

    // Adobe PDF Document
    case 'pdf':
      return <AiOutlineFilePdf className="text-danger text-2xl" />;

    // Image Files
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <AiOutlineFileImage className="text-pending text-2xl" />;

    // Unknown File Type
    default:
      return <AiOutlineFileUnknown className="text-secondary text-2xl" />;
  }
};

/**
 * Get the icon for a table action
 * @param {string} icon - The type of icon to get
 * @returns {ReactElement} - The icon for the action
 */
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

    // Unknown Action
    default:
      return <AiOutlineQuestionCircle />;
  }
};

