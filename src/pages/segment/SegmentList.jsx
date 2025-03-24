import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { updateSiteStatusApi } from '../../apis/site-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import useColorContext from '../../hooks/useColorContext';
import TableHeader from '../../atoms/table/TableHeader';

const SegmentList = () => {
  const { isDarkMode } = useColorContext();
  const [sites, setSites] = useState([]);

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
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success` : `${isDarkMode ? 'border border-inactive' : 'bg-inactive'} text-inactive`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-green ' : 'bg-darkgray'}`} />
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
    { id: 3, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 4, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 5, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Segments'} />
      <TableComponent
        selectable={true}
        siteModule={'segment'}
        headers={columnConfig}
        tableData={(data) => setSites(data.sites)}
        rows={rows}
        apiUrl={'sites'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/site/edit-site'}
        appsPath={'/apps/integration'}
        search={true}
        filter={true}
        filterCategory={[{ id: 2, name: 'Status' }]}
        statuses={[
          { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
          { id: 1, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
        ]}
        searchCategory={[{ id: 0, name: 'Name' }]}
        modifyStatus={true}
        modifyStatusApi={updateSiteStatusApi}
      />
    </div>
  );
};

export default SegmentList;
