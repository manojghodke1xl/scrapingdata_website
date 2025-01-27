import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { formatDateTime } from '../../../utils/dateFormats';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';

const TemplateCategoryList = () => {
  const [templateCategory, setTemplateCategory] = useState([]);

  const rows = templateCategory.map((templateCategory) => {
    const { _id, name, createdAt, updatedAt } = templateCategory;
    return {
      id: _id,
      exportData: templateCategory,
      keys: _id,
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
            <h4 className="text-3xl text-dark">Template Categories</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/templates/add-template-category" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Template Category</span>
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
                  { label: 'Key', key: 'keys' },
                  { label: 'Name', key: 'name' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setTemplateCategory(data.templateCategories)}
                rows={rows}
                apiUrl={'template-category'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/templates/edit-template-category'}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCategoryList;
