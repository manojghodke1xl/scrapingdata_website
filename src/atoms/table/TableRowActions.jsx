import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { MdEdit, MdOutlineApps, MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TableRowActions = ({ row, edit, editPath, view, viewPath, apps, appsPath, copy, copyPath }) => {
  const navigate = useNavigate();

  // Function to count the available actions
  const getActions = (row) => {
    return [
      { type: 'edit', show: edit && !row.isSuperAdmin },
      { type: 'view', show: view && !row.isSuperAdmin },
      { type: 'apps', show: apps && !row.isSuperAdmin },
      { type: 'copy', show: copy && !row.isSuperAdmin }
    ].filter((action) => action.show);
  };

  const availableActions = getActions(row);

  return (
    <td className="w-full flex gap-2 items-center px-6 py-2 whitespace-nowrap font-medium text-secondary">
      {/* If there are more than 2 actions, show dropdown */}
      {availableActions.length > 2 ? (
        <details className="relative inline-block text-left">
          <summary className="text-white p-1.5 rounded-xl hover:bg-white cursor-pointer focus:outline-none">
            <BsThreeDotsVertical size={20} className="text-secondary hover:text-primary" />
          </summary>
          <ul className="absolute top-full mt-2 right-0 z-40 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            {availableActions.map((action, i) => (
              <button
                key={i}
                className="w-full flex gap-2 items-center px-4 py-2 text-sm text-secondary hover:bg-gray-100 hover:text-primary cursor-pointer focus:outline-none"
                onClick={() => {
                  if (action.type === 'edit') navigate(editPath + '/' + row.id);
                  if (action.type === 'view') navigate(viewPath + '/' + row.id);
                  if (action.type === 'apps') navigate(appsPath + '/' + row.id);
                  if (action.type === 'copy') navigate(copyPath + '/' + row.id);
                }}
              >
                {action.type === 'edit' && <MdEdit size={20} />}
                {action.type === 'view' && <MdRemoveRedEye size={20} />}
                {action.type === 'apps' && <MdOutlineApps size={20} />}
                {action.type === 'copy' && <FiCopy size={20} />}
                {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
              </button>
            ))}
          </ul>
        </details>
      ) : (
        availableActions.map((action, i) => (
          <span
            key={i}
            className="text-2xl hover:text-gray-900 cursor-pointer"
            onClick={() => {
              if (action.type === 'edit') navigate(editPath + '/' + row.id);
              if (action.type === 'view') navigate(viewPath + '/' + row.id);
              if (action.type === 'apps') navigate(appsPath + '/' + row.id);
              if (action.type === 'copy') navigate(copyPath + '/' + row.id);
            }}
          >
            {action.type === 'edit' && <MdEdit />}
            {action.type === 'view' && <MdRemoveRedEye />}
            {action.type === 'apps' && <MdOutlineApps />}
            {action.type === 'copy' && <FiCopy />}
          </span>
        ))
      )}
    </td>
  );
};

export default TableRowActions;
