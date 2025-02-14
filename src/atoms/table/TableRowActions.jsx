import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import { MdEdit, MdOutlineApps, MdRemoveRedEye, MdOutlineInventory2, MdSend, MdDeleteForever } from 'react-icons/md';
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
  sendCertificate,
  sendCertificateUnique,
  approvalApi,
  whatsappRefresh
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
      { type: 'sendForApproval', show: sendForApproval && !row.approvedTemplate },
      { type: 'sendCertificate', show: sendCertificate && row.certificate },
      { type: 'sendCertificateUnique', show: sendCertificateUnique && row.certificate },
      { type: 'whatsappRefresh', show: whatsappRefresh }
    ].filter((action) => action.show);
  };

  const availableActions = getActions(row);

  return (
    <td className="flex gap-2 items-center px-6 whitespace-nowrap font-medium text-secondary text-sm">
      {/* If there are more than 2 actions, show dropdown */}
      {availableActions.length > 0 ? (
        <details className="inline-block text-left">
          <summary className="text-white p-1.5 rounded-xl hover:bg-hover cursor-pointer focus:outline-none">
            <BsThreeDotsVertical size={20} className="text-secondary hover:text-primary" />
          </summary>
          <ul className={`absolute mt-2 right-10 z-40 w-fit rounded-md bg-main shadow-lg border border-primary`}>
            {availableActions.map((action, i) => (
              <button
                key={i}
                className="w-full flex gap-2 items-center px-4 py-2 text-secondary hover:bg-hover hover:text-primary cursor-pointer focus:outline-none"
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
                  if (action.type === 'sendCertificate') await approvalApi(row.bookingId, false);
                  if (action.type === 'sendCertificateUnique') await approvalApi(row.bookingId, true);
                  if (action.type === 'whatsappRefresh') await whatsappRefresh(row.id);
                }}
              >
                {action.type === 'edit' && <MdEdit size={20} />}
                {action.type === 'view' && <MdRemoveRedEye size={20} />}
                {action.type === 'apps' && <MdOutlineApps size={20} />}
                {action.type === 'copy' && <FiCopy size={20} />}
                {action.type === 'delete' && <MdDeleteForever size={20} />}
                {action.type === 'managePackage' && <MdOutlineInventory2 size={20} />}
                {action.type === 'whatsappRefresh' && <IoMdRefresh size={20} />}
                {(action.type === 'sendForApproval' || action.type === 'sendCertificate' || action.type === 'sendCertificateUnique') && <MdSend size={20} />}

                {action.type === 'managePackage'
                  ? 'Manage Package'
                  : action.type === 'sendForApproval'
                  ? 'Send For Approval'
                  : action.type === 'sendCertificate'
                  ? 'Send All Certificates'
                  : action.type === 'sendCertificateUnique'
                  ? 'Send Unique Certificates'
                  : action?.type == 'whatsappRefresh'
                  ? 'WhatsApp Refresh'
                  : action.type.charAt(0).toUpperCase() + action.type.slice(1)}
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
