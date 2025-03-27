import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { isDarkMode } = useColorContext();
  const [testimonials, setTestimonials] = useState([]);

  const rows = testimonials.map((testimonial) => {
    const { _id, name, isActive, sites, createdAt, updatedAt } = testimonial;
    return {
      id: _id,
      exportData: testimonial,
      name: <TruncatableFieldToolTip content={name} />,
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
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 2, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 3, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 4, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/testimonials/edit-testimonial/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/testimonials/duplicate-testimonial/${row.id}`) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Testimonials'} btn1={true} href1={'/testimonials/add-testimonial'} icon1={<IoMdAdd />} btnLabel1={'Add Testimonial'} />
      <TableComponent
        selectable={true}
        siteModule={'testimonial'}
        headers={columnConfig}
        tableData={(data) => setTestimonials(data.testimonials)}
        rows={rows}
        apiUrl={'testimonial'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[
          { id: 1, name: 'Sites' },
          { id: 2, name: 'Status' }
        ]}
        statuses={[
          { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
          { id: 1, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
        ]}
        searchCategory={[{ id: 0, name: 'Name' }]}
        modifyStatus={true}
        modifyStatusApi={updateTestimonialStatusApi}
        modifySite={true}
        modifySiteApi={updateTestimonialSitesApi}
        actionItems={actionItems}
      />
      <NoteComponent note={testimonialListNote} />
    </div>
  );
};

export default TestimonialList;
