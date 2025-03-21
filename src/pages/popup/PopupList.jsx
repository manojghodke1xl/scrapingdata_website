import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineApi } from 'react-icons/ai';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deletePopupApi, duplicatePopupApi, updatePopupStatusApi } from '../../apis/popup-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listPopupNote } from './PopupNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const PopupList = () => {
  const { isDarkMode } = useColorContext();
  const [popups, setPopups] = useState([]);

  const rows = popups.map((popup) => {
    const { _id, name, showOnDeviceType, contentType, isActive, site, createdAt, updatedAt } = popup;
    return {
      id: _id,
      exportData: popup,
      name: <TruncatableFieldToolTip content={name} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host}) `} maxLength={20} />,
      showOnDeviceType: showOnDeviceType === 'mobile' ? 'Mobile' : showOnDeviceType === 'desktop' ? 'Desktop' : 'All',
      contentType: contentType === 'guide' ? 'Guide' : contentType === 'casestudy' ? 'Case Study' : 'Basic',
      status: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success` : `${isDarkMode ? 'border border-inactive' : 'bg-inactive'} text-inactive`
          } p-0.5 text-sm w-fit flex gap-1 items-center`}
        >
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green ' : 'bg-darkgray'}`} />
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 2, label: 'Device Type', key: 'showOnDeviceType', dataKey: 'showOnDeviceType' },
    {
      id: 3,
      label: 'Type',
      key: 'contentType',
      dataKey: 'contentType',
      formatForExport: (value) => (value === 'guide' ? 'Guide' : value === 'casestudy' ? 'Case Study' : 'Basic')
    },
    { id: 4, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 5, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 6, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <div className="w-full">
        <TableHeader
          heading={'Pop-ups'}
          btn1={true}
          href1={'/pop-up/pop-up-integration'}
          icon1={<AiOutlineApi />}
          btnLabel1={'API Integration'}
          btn2={true}
          href2={'/pop-up/add-pop-up'}
          icon2={<IoMdAdd />}
          btnLabel2={'Add Pop-up'}
        />
        <div className="flex flex-col min-w-full align-middle overflow-x-auto">
          <TableComponent
            selectable={true}
            siteModule={'popup'}
            headers={columnConfig}
            tableData={(data) => setPopups(data.popups)}
            rows={rows}
            apiUrl={'popups'}
            tableCountLabel={true}
            pagination={true}
            actions={true}
            editPath={'/pop-up/edit-pop-up'}
            copyPath={'/pop-up/duplicate-pop-up'}
            search={true}
            filter={true}
            filterCategory={[
              { id: 1, name: 'Sites' },
              { id: 2, name: 'Status' }
            ]}
            statuses={[
              { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
              { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
            ]}
            searchCategory={[{ id: 1, name: 'Name' }]}
            deleteAction={true}
            deleteBtn={true}
            deleteApi={deletePopupApi}
            deleteLabel={'Delete Pop-up'}
            deleteMessage={'Are you sure you want to delete this pop-up?'}
            modifyStatus={true}
            modifyStatusApi={updatePopupStatusApi}
            duplicateBtn={true}
            duplicateApi={duplicatePopupApi}
          />
        </div>
      </div>
      <NoteComponent note={listPopupNote} />
    </div>
  );
};

export default PopupList;
