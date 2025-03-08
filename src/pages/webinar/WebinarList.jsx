import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';

const WebinarList = () => {
  const [webinars, setWebinars] = useState([]);

  const rows = webinars.map((webinar) => {
    const { _id, name, createdAt, updatedAt } = webinar;
    return {
      id: _id,
      exportData: webinar,
      key: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Key', key: 'key', dataKey: '_id' },
    { id: 1, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Webinars'} btn1={true} href1={'/webinar/add-webinar'} icon1={<IoMdAdd />} btnLabel1={'Add Webinar'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={columnConfig}
                tableData={(data) => setWebinars(data.webinars)}
                rows={rows}
                apiUrl={'webinar'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/webinar/edit-webinar'}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarList;
