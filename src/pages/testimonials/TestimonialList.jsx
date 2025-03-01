import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { updateTestimonialSitesApi, updateTestimonialStatusApi } from '../../apis/testimonial-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { testimonialListNote } from './TestimonialNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const TestimonialList = () => {
  const { isDarkMode } = useColorContext();
  const [testimonials, setTestimonials] = useState([]);

  const rows = testimonials.map((testimonial) => {
    const { _id, name, isActive, sites, createdAt, updatedAt } = testimonial;
    return {
      id: _id,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      sites: <TruncatableFieldToolTip title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      status: (
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
        <TableHeader heading={'Testimonials'} btn1={true} href1={'/testimonials/add-testimonial'} icon1={<IoMdAdd />} btnLabel1={'Add Testimonial'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'testimonial'}
                headers={[
                  { label: 'Name', key: 'name' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setTestimonials(data.testimonials)}
                rows={rows}
                apiUrl={'testimonial'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/testimonials/edit-testimonial'}
                copyPath={'/testimonials/duplicate-testimonial'}
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
                searchCategory={[{ id: 1, name: 'Name' }]}
                modifyStatus={true}
                modifyStatusApi={updateTestimonialStatusApi}
                modifySite={true}
                modifySiteApi={updateTestimonialSitesApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={testimonialListNote} />
    </div>
  );
};

export default TestimonialList;
