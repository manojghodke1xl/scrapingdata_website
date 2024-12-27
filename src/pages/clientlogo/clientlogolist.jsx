import { useState } from 'react';
import useGetAllSites from '../../hooks/useGetAllSites';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteClientLogoApi, updateClientLogoSitesApi, updateClientLogoStatusApi } from '../../apis/client-logo-apis';

const ClientLogoList = () => {
  const allsites = useGetAllSites();
  const [clientlogos, setClientLogos] = useState([]);

  const rows = clientlogos.map((clientlogo) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = clientlogo;

    return {
      id: _id,
      image: <img src={image.url} alt="Company Logo" className="w-8 h-8 rounded" />,
      sites: <TruncatableFieldModal title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      status: (
        <div className={`rounded-xl ${isActive ? 'bg-[#ECFDF3] text-[#027948]' : 'bg-[#F2F4F7] text-[#344054]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Client Logo List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/client-logo/add-client-logo" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Client Logo</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Client Logo', key: 'image' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setClientLogos(data.clientlogos)}
                rows={rows}
                apiUrl={'client-logo'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/client-logo/edit-client-logo'}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                allsites={allsites}
                modifyStatus={true}
                modifyStatusApi={updateClientLogoStatusApi}
                modifySite={true}
                modifySiteApi={updateClientLogoSitesApi}
                deleteBtn={true}
                deleteApi={deleteClientLogoApi}
                deleteLabel={'Delete Client Logo'}
                deleteMessage={'Are you sure you want to delete this Client Logo?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoList;
