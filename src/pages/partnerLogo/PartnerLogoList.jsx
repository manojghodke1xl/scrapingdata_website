import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { IoMdAdd } from 'react-icons/io';
import { deletePartnerLogoApi, updatePartnerLogoSitesApi, updatePartnerLogoStatusApi } from '../../apis/partner-logo-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { partnerLogoListNote } from './PartnerLogoNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const PartnerLogoList = () => {
  const { isDarkMode } = useColorContext();
  const [partnerlogos, setPartnerLogos] = useState([]);

  const rows = partnerlogos.map((partnerLogo) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = partnerLogo;

    return {
      id: _id,
      exportData: partnerLogo,
      image: <img src={image.url} alt="Company Logo" className="w-8 h-8 rounded" />,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
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
    { id: 0, label: 'Image', key: 'image', dataKey: 'image', formatForExport: (value) => (value ? value.url : '') },
    { id: 1, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 2, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 3, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 4, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Partner Logos'} btn1={true} href1={'/partner-logo/add-partner-logo'} icon1={<IoMdAdd />} btnLabel1={'Add Partner Logo'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                search={true}
                siteModule={'partnerlogo'}
                headers={columnConfig}
                tableData={(data) => setPartnerLogos(data.partnerlogos)}
                rows={rows}
                apiUrl={'partner-logo'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/partner-logo/edit-partner-logo'}
                copyPath={'/partner-logo/duplicate-partner-logo'}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                modifyStatus={true}
                modifyStatusApi={updatePartnerLogoStatusApi}
                modifySite={true}
                modifySiteApi={updatePartnerLogoSitesApi}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deletePartnerLogoApi}
                deleteLabel={'Delete Partner Logo'}
                deleteMessage={'Are you sure you want to delete this partner logo?'}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={partnerLogoListNote} />
    </div>
  );
};

export default PartnerLogoList;
