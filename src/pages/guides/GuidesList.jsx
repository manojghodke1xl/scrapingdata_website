import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import { updateGuideSitesApi, updateGuideStatusApi } from '../../apis/guide-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { guideListNote } from './GuideNotes';
import { AiOutlineApi } from 'react-icons/ai';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const GuidesList = () => {
  const { isDarkMode } = useColorContext();
  const [guides, setGuides] = useState([]);

  const rows = guides.map((guide) => {
    const { _id, title, isActive, sites, createdAt, updatedAt } = guide;
    return {
      id: _id,
      exportData: guide,
      title: <TruncatableFieldToolTip content={title} />,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      status: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success` : `${isDarkMode ? 'border border-inactive' : 'bg-inactive'} text-inactive`
          } p-0.5 w-fit text-sm flex gap-1 items-center`}
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
    { id: 0, label: 'Title', key: 'title', dataKey: 'title' },
    { id: 1, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt' },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt' },
    { id: 4, label: 'Status', key: 'status', dataKey: 'status', formatForExport: (value) => (value ? 'Active' : 'Inactive') }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading={'Guides'}
        btn1={true}
        href1={'/guides/guides-integration'}
        icon1={<AiOutlineApi />}
        btnLabel1={'Integration Guide PDF'}
        btn2={true}
        href2={'/guides/add-guide'}
        icon2={<IoMdAdd />}
        btnLabel2={'Add Guide'}
      />
      <TableComponent
        selectable={true}
        siteModule={'guide'}
        headers={columnConfig}
        tableData={(data) => setGuides(data.guides)}
        rows={rows}
        apiUrl={'guides'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/guides/edit-guide'}
        copyPath={'/guides/duplicate-guide'}
        search={true}
        filter={true}
        filterCategory={[
          { id: 0, name: 'Sites' },
          { id: 1, name: 'Status' }
        ]}
        statuses={[
          { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
          { id: 1, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
        ]}
        searchCategory={[{ id: 0, name: 'Title' }]}
        modifyStatus={true}
        modifyStatusApi={updateGuideStatusApi}
        modifySite={true}
        modifySiteApi={updateGuideSitesApi}
      />
      <NoteComponent note={guideListNote} />
    </div>
  );
};

export default GuidesList;
