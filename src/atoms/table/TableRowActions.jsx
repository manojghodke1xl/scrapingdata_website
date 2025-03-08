import { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { MdEdit, MdOutlineApps, MdRemoveRedEye, MdOutlineInventory2, MdSend, MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TableRowActions = ({
  row,
  editPath,
  viewPath,
  appsPath,
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
  openDropdownId,
  onToggle
}) => {
  const navigate = useNavigate();
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && dropdownRef.current && buttonRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        onToggle(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId, onToggle]);

  const handleToggle = (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Calculate position relative to viewport
      setDropdownPosition({
        top: rect.bottom + scrollY,
        left: rect.left + scrollX - 110
      });
    }

    onToggle(id);
  };

  // Function to count the available actions
  const getActions = (row) => {
    return [
      { type: 'edit', show: editPath && !row.isSuperAdmin },
      { type: 'view', show: viewPath && !row.isSuperAdmin },
      { type: 'apps', show: appsPath && !row.isSuperAdmin },
      { type: 'copy', show: copyPath && !row.isSuperAdmin },
      { type: 'delete', show: deleteAction && !row.isSuperAdmin && !row.hasBooking },
      { type: 'managePackage', show: managePackage },
      { type: 'sendForApproval', show: sendForApproval && !row.approvedTemplate },
      { type: 'sendCertificate', show: sendCertificate && row.certificate },
      { type: 'sendCertificateUnique', show: sendCertificateUnique && row.certificate }
    ].filter((action) => action.show);
  };

  const availableActions = getActions(row);

  return availableActions.length > 0 ? (
    <div className="relative">
      <button ref={buttonRef} className="text-white p-1.5 rounded-xl hover:bg-hover cursor-pointer focus:outline-none" onClick={(e) => handleToggle(row.id, e)}>
        <BsThreeDotsVertical size={20} className="text-secondary hover:text-primary" />
      </button>

      {openDropdownId === row.id && (
        <ul
          ref={dropdownRef}
          className="fixed w-fit rounded-md bg-main shadow-lg border border-primary"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          {availableActions.map((action, i) => (
            <button
              key={i}
              className="w-full flex gap-2 items-center px-4 py-2 text-secondary hover:bg-hover hover:text-primary cursor-pointer focus:outline-none"
              onClick={async (e) => {
                e.stopPropagation();
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
                if (action.type === 'sendCertificate') await approvalApi(row.bookingId, false, sendCertificate !== 'ID');
                if (action.type === 'sendCertificateUnique') await approvalApi(row.bookingId, true, sendCertificate !== 'ID');
              }}
            >
              {action.type === 'edit' && <MdEdit size={20} />}
              {action.type === 'view' && <MdRemoveRedEye size={20} />}
              {action.type === 'apps' && <MdOutlineApps size={20} />}
              {action.type === 'copy' && <FiCopy size={20} />}
              {action.type === 'delete' && <MdDeleteForever size={20} />}
              {action.type === 'managePackage' && <MdOutlineInventory2 size={20} />}
              {(action.type === 'sendForApproval' || action.type === 'sendCertificate' || action.type === 'sendCertificateUnique') && <MdSend size={20} />}

              {action.type === 'managePackage'
                ? 'Manage Package'
                : action.type === 'sendForApproval'
                ? 'Send For Approval'
                : action.type === 'sendCertificate'
                ? 'Send All Certificates'
                : action.type === 'sendCertificateUnique'
                ? 'Send Unique Certificates'
                : action.type.charAt(0).toUpperCase() + action.type.slice(1)}
            </button>
          ))}
        </ul>
      )}
    </div>
  ) : (
    'N/A'
  );
};

export default TableRowActions;
