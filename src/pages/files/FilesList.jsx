import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { deleteFileApi } from '../../apis/file-apis';

const FilesList = () => {
  const [files, setFiles] = useState([]);

  const rows = files.map((files) => {
    const { _id, site, attachments, createdAt, updatedAt } = files;
    console.log('site', site);
    return {
      id: _id,
      attachments: <TruncatableFieldModal title={'File Name'} content={attachments.map((a) => `${a.name}`).join(', ')} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site.name} (${site.host})}`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Files</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/files/add-file" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add File</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'events'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'File Name', key: 'attachments' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setFiles(data.files)}
                rows={rows}
                apiUrl={'files'}
                tableCountLabel={true}
                pagination={true}
                // actions={true}
                // edit={true}
                // editPath={'/files/edit-file'}
                // view={true}
                // viewPath={'/files/view-file'}
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
