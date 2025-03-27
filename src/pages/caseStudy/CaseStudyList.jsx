import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { updateCaseStudySitesApi, updateCaseStudyStatusApi } from '../../apis/caseStudy-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { casestudyListNote } from './CaseStudyNotes';
import { AiOutlineApi } from 'react-icons/ai';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const CaseStudyList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useColorContext();
  const [caseStudies, setCaseStudies] = useState([]);

  const rows = caseStudies.map((caseStudy) => {
    const { _id, title, isActive, sites, createdAt, updatedAt } = caseStudy;
    return {
      id: _id,
      exportData: caseStudy,
      title: <TruncatableFieldToolTip content={title} />,
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
    { id: 0, label: 'Title', key: 'title', dataKey: 'title' },
    {
      id: 1,
      label: 'Sites',
      key: 'sites',
      dataKey: 'sites',
      formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '')
    },
    {
      id: 2,
      label: 'Created Date',
      key: 'createdAt',
      dataKey: 'createdAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 3,
      label: 'Updated Date',
      key: 'updatedAt',
      dataKey: 'updatedAt',
      formatForExport: (value) => formatDateTime(value)
    },
    { id: 4, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/case-study/edit-case-study/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/case-study/duplicate-case-study/${row.id}`) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading={'Case Studies'}
        btn2={true}
        href2={'/case-study/add-case-study'}
        icon2={<IoMdAdd />}
        btnLabel2={'Add Case Study'}
        btn1={true}
        href1={'/case-study/case-study-integration'}
        icon1={<AiOutlineApi />}
        btnLabel1={'Integration Guide PDF'}
      />
      <TableComponent
        selectable={true}
        siteModule={'casestudy'}
        headers={columnConfig}
        tableData={(data) => setCaseStudies(data.casestudies)}
        rows={rows}
        apiUrl={'casestudies'}
        pagination={true}
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
        modifyStatusApi={updateCaseStudyStatusApi}
        modifySite={true}
        modifySiteApi={updateCaseStudySitesApi}
        actionItems={actionItems}
      />
      <NoteComponent note={casestudyListNote} />
    </div>
  );
};

export default CaseStudyList;
