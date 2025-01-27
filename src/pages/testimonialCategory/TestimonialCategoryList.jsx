import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import NoteComponent from '../../atoms/common/NoteComponent';
import { testimonialCategoryListNote } from './TestimonialCategoryNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const TestimonialCategoryList = () => {
  const [testimonialCategories, setTestimonialCategories] = useState([]);

  const rows = testimonialCategories.map((testimonialCategory) => {
    const { _id, name, createdAt, updatedAt } = testimonialCategory;
    return {
      id: _id,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Testimonials Category List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link
              to="/testimonial-category/add-testimonial-category"
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white"
            >
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Testimonials Category</span>
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
                  { label: 'Name', key: 'name' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setTestimonialCategories(data.categories)}
                rows={rows}
                apiUrl={'categories'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/testimonial-category/edit-testimonial-category'}
                search={true}
                searchCategory={[{ id: 1, name: 'Name' }]}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={testimonialCategoryListNote} />
    </div>
  );
};

export default TestimonialCategoryList;
