import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import { deleteFileApi } from '../../apis/file-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const FilesList = () => {
  const [files, setFiles] = useState([]);

  const rows = files.map((files) => {
    const { _id, site, attachments, createdAt, updatedAt } = files;
    return {
      id: _id,
      attachments: <TruncatableFieldToolTip title={'File Name'} content={attachments.map((a) => `${a.name}`).join(', ')} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site.name} (${site.host})}`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Files'} btn1={true} href1={'/files/add-file'} icon1={<IoMdAdd />} btnLabel1={'Add File'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'files'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'File Name', key: 'attachments' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setFiles(data.files)}
                rows={rows}
                apiUrl={'file'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/files/edit-file'}
                deleteBtn={true}
                deleteApi={deleteFileApi}
                deleteMessage="Are you sure you want to delete this file?"
                deleteLabel={'Delete File'}
                search={true}
                filter={true}
                filterCategory={[{ id: 1, name: 'Sites' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilesList;
