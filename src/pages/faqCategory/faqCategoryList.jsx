import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';

const FaqCategoryList = () => {
  const [faqCategories, setFaqCategories] = useState([]);

  const rows = faqCategories.map((faqCategory) => {
    const { _id, name, createdAt, updatedAt } = faqCategory;
    return {
      id: _id,
      name: <TruncatableFieldModal title={'Name'} content={name} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All FAQ Category List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/faq/add-faq-category" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add FAQ Category</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                // selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setFaqCategories(data.faqCategories)}
                rows={rows}
                apiUrl={'faq-category'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/faq/edit-faq-category'}
                search={true}
                searchCategory={[{ id: 1, name: 'Name' }]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <NoteComponent note={} /> */}
    </div>
  );
};

export default FaqCategoryList;
