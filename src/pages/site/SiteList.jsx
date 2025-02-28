import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updateSiteStatusApi } from '../../apis/site-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { websiteListNote } from './SiteNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import useColorContext from '../../hooks/useColorContext';

const SiteList = () => {
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
      name: <TruncatableFieldToolTip title={'Website Name'} content={name} />,
      host: <TruncatableFieldToolTip title={'Web Address'} content={host} />,
      isActive: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-[#027948]' : 'bg-[#ECFDF3]'} text-[#027948]` : `${isDarkMode ? 'border border-[#344054]' : 'bg-[#F2F4F7]'} text-[#344054]`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between">
          <h4 className="text-3xl text-dark">All Sites</h4>
          {isSuperAdmin && (
            <div className="w-full flex justify-end sm:w-fit">
              <Link to="/site/add-site" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primary-hover text-white">
                <IoMdAdd />
                <span className="hidden md:block">Add Site</span>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Key', key: 'keys' },
                  { label: 'Website Name', key: 'name' },
                  { label: 'Web Address', key: 'host' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
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
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[{ id: 1, name: 'Name' }]}
                modifyStatus={true}
                modifyStatusApi={updateSiteStatusApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={websiteListNote} />
    </div>
  );
};

export default SiteList;
