import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { MdEdit, MdOutlineApps, MdRemoveRedEye, MdOutlineInventory2, MdSend } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const TableRowActions = ({
  row,
  edit,
  editPath,
  view,
  viewPath,
  apps,
  appsPath,
  copy,
  copyPath,
  deleteAction,
  setSelectionState,
  setModalState,
  managePackage,
  managePackagePath,
  sendForApproval,
  approvalApi
}) => {
  const navigate = useNavigate();

  // Function to count the available actions
  const getActions = (row) => {
    return [
      { type: 'edit', show: edit && !row.isSuperAdmin },
      { type: 'view', show: view && !row.isSuperAdmin },
      { type: 'apps', show: apps && !row.isSuperAdmin },
      { type: 'copy', show: copy && !row.isSuperAdmin },
      { type: 'delete', show: deleteAction && !row.isSuperAdmin && !row.hasBooking },
      { type: 'managePackage', show: managePackage },
      { type: 'sendForApproval', show: sendForApproval && !row.whatsAppTemplateId }
    ].filter((action) => action.show);
  };

  const availableActions = getActions(row);

  return (
    <td className="flex gap-2 items-center px-6 whitespace-nowrap font-medium text-secondary text-sm">
      {/* If there are more than 2 actions, show dropdown */}
      {availableActions.length > 0 ? (
        <details className="inline-block text-left">
          <summary className="text-white p-1.5 rounded-xl hover:bg-white cursor-pointer focus:outline-none">
            <BsThreeDotsVertical size={20} className="text-secondary hover:text-primary" />
          </summary>
          <ul className={`absolute mt-2 right-10 z-40 w-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}>
            {availableActions.map((action, i) => (
              <button
                key={i}
                className="w-full flex gap-2 items-center px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary cursor-pointer focus:outline-none"
                onClick={async () => {
                  if (action.type === 'edit') navigate(editPath + '/' + row.id);
                  if (action.type === 'view') navigate(viewPath + '/' + row.id);
                  if (action.type === 'apps') navigate(appsPath + '/' + row.id);
                  if (action.type === 'copy') navigate(copyPath + '/' + row.id);
                  if (action.type === 'delete') {
                    setSelectionState((prev) => ({ ...prev, deleteId: row.id }));
                    setModalState((prev) => ({ ...prev, isDeleteModelOpen: true }));
                  }
                  if (action.type === 'managePackage') navigate(`${managePackagePath}?eventId=${row.id}`);
                  if (action.type === 'sendForApproval') await approvalApi(row.id);
                }}
              >
                {action.type === 'edit' && <MdEdit size={20} />}
                {action.type === 'view' && <MdRemoveRedEye size={20} />}
                {action.type === 'apps' && <MdOutlineApps size={20} />}
                {action.type === 'copy' && <FiCopy size={20} />}
                {action.type === 'delete' && <RiDeleteBinLine size={20} />}
                {action.type === 'managePackage' && <MdOutlineInventory2 size={20} />}
                {action.type === 'sendForApproval' && <MdSend size={20} />}
                {action.type === 'managePackage'
                  ? 'Manage Package'
                  : action.type === 'sendForApproval'
                  ? 'Send For Approval'
                  : action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                {}
              </button>
            ))}
          </ul>
        </details>
      ) : (
        'N/A'
      )}
    </td>
  );
};

export default TableRowActions;
