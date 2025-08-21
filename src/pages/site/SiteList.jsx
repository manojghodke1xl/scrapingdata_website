import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updateSiteStatusApi } from '../../apis/site-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { websiteListNote } from './SiteNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import useColorContext from '../../hooks/useColorContext';
import TableHeader from '../../atoms/table/TableHeader';

const SiteList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useColorContext();
  const [sites, setSites] = useState([]);
  const {
    auth: { isSuperAdmin }
  } = useGlobalContext();

  const rows = sites.map((site) => {
    const { _id, name, host, isActive, createdAt, updatedAt } = site;
    return {
      id: _id,
      exportData: site,
      keys: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip content={name} />,
      host: <TruncatableFieldToolTip content={host} />,
      status: (
        <div
          className={`rounded-xl ${isActive ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success` : `${isDarkMode ? 'border border-inactive' : 'bg-inactive'} text-inactive`
            } p-0.5 w-fit text-sm flex gap-x-1 items-center`}
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
    { id: 0, label: 'Key', key: 'keys', dataKey: '_id' },
    { id: 1, label: 'Website Name', key: 'name', dataKey: 'name' },
    { id: 2, label: 'Web Address', key: 'host', dataKey: 'host' },
    {
      id: 3,
      label: 'Created Date',
      key: 'createdAt',
      dataKey: 'createdAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 4,
      label: 'Updated Date',
      key: 'updatedAt',
      dataKey: 'updatedAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 5,
      label: 'Status',
      key: 'status',
      dataKey: 'isActive',
      formatForExport: (value) => (value ? 'Active' : 'Inactive')
    }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/site/edit-site/${row.id}`) },
    { id: 1, label: 'Apps', icon: 'apps', handler: (row) => navigate(`/apps/integration/${row.id}`) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'All Sites'} btn1={true} href1={'/site/add-site'} icon1={<IoMdAdd />} btnLabel1={'Add Site'} isSuperAdmin={isSuperAdmin} />
      <TableComponent
        selectable={true}
        siteModule={'site'}
        headers={columnConfig}
        tableData={(data) => setSites(data.sites)}
        rows={rows}
        apiUrl={'sites'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 2, name: 'Status' }]}
        statuses={[
          { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
          { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
        ]}
        searchCategory={[{ id: 1, name: 'Name' }]}
        modifyStatus={true}
        modifyStatusApi={updateSiteStatusApi}
        bulkSiteOpenAction={sites.map((site) => site.host)}
        actionItems={actionItems}
      />
      <NoteComponent note={websiteListNote} />
    </div>
  );
};

export default SiteList;
