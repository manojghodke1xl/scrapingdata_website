import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { updateGuideSitesApi, updateGuideStatusApi } from '../../apis/guide-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { guideListNote } from './GuideNotes';
import { AiOutlineApi } from 'react-icons/ai';

const GuidesList = () => {
  const [guides, setGuides] = useState([]);

  const rows = guides.map((guide) => {
    const { _id, title, isActive, sites, createdAt, updatedAt } = guide;
    return {
      id: _id,
      title: <TruncatableFieldModal title={'Title'} content={title} />,
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
            <h4 className="text-3xl text-dark">All Guides List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit gap-2">
            <Link to="/guides/add-guides" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 border border-primary text-primary">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Guides</span>
            </Link>
            <Link to="/guides/guides-integration" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <AiOutlineApi size={22} />
              <span className="hidden md:block">Integration Guide PDF</span>
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
                  { label: 'Title', key: 'title' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setGuides(data.guides)}
                rows={rows}
                apiUrl={'guides'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/guides/edit-guides'}
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
                modifyStatusApi={updateGuideStatusApi}
                modifySite={true}
                modifySiteApi={updateGuideSitesApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={guideListNote} />
    </div>
  );
};

export default GuidesList;
