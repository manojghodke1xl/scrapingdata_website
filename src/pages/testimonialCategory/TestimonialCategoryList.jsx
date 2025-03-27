import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import NoteComponent from '../../atoms/common/NoteComponent';
import { testimonialCategoryListNote } from './TestimonialCategoryNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const TestimonialCategoryList = () => {
  const navigate = useNavigate();
  const [testimonialCategories, setTestimonialCategories] = useState([]);

  const rows = testimonialCategories.map((testimonialCategory) => {
    const { _id, name, createdAt, updatedAt } = testimonialCategory;
    return {
      id: _id,
      exportData: testimonialCategory,
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 2, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [{ id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/testimonial-category/edit-testimonial-category/${row.id}`) }];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading={'Testimonials Categories'}
        btn1={true}
        href1={'/testimonial-category/add-testimonial-category'}
        icon1={<IoMdAdd />}
        btnLabel1={'Add Testimonials Category'}
      />
      <TableComponent
        selectable={true}
        siteModule={'testimonial-category'}
        headers={columnConfig}
        tableData={(data) => setTestimonialCategories(data.categories)}
        rows={rows}
        apiUrl={'testimonial-category'}
        pagination={true}
        search={true}
        actionItems={actionItems}
      />
      <NoteComponent note={testimonialCategoryListNote} />
    </div>
  );
};

export default TestimonialCategoryList;
