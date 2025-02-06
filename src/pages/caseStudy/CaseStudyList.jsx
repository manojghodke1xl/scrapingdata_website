import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { updateCaseStudySitesApi, updateCaseStudyStatusApi } from '../../apis/caseStudy-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { casestudyListNote } from './CaseStudyNotes';
import { AiOutlineApi } from 'react-icons/ai';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const CaseStudyList = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  const rows = caseStudies.map((caseStudy) => {
    const { _id, title, isActive, sites, createdAt, updatedAt } = caseStudy;
    return {
      id: _id,
      exportData: caseStudy,
      title: <TruncatableFieldToolTip title={'Title'} content={title} />,
      sites: <TruncatableFieldToolTip title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      isActive: (
        <div className={`rounded-xl ${isActive ? 'bg-[#ECFDF3] text-[#027948]' : 'bg-[#F2F4F7] text-[#344054]'} px-2 py-1 w-fit flex gap-2 items-center`}>
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
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule="casestudy"
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Title', key: 'title' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setCaseStudies(data.casestudies)}
                rows={rows}
                apiUrl={'casestudies'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/case-study/edit-case-study'}
                copy={true}
                copyPath={'/case-study/duplicate-case-study'}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[{ id: 1, name: 'Title' }]}
                modifyStatus={true}
                modifyStatusApi={updateCaseStudyStatusApi}
                modifySite={true}
                modifySiteApi={updateCaseStudySitesApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={casestudyListNote} />
    </div>
  );
};

export default CaseStudyList;
