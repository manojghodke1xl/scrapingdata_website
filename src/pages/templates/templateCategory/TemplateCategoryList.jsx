import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../../utils/dateFormats';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../../atoms/table/TableHeader';
import TruncatableCopyFeild from '../../../atoms/common/TruncatableCopyFeild';

const TemplateCategoryList = () => {
  const [templateCategory, setTemplateCategory] = useState([]);

  const rows = templateCategory.map((templateCategory) => {
    const { _id, name, createdAt, updatedAt } = templateCategory;
    return {
      id: _id,
      exportData: templateCategory,
      key: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Template Categories'} btn1={true} href1={'/template-category/add-template-category'} icon1={<IoMdAdd />} btnLabel1={'Add Template Category'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Key', key: 'key' },
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
                editPath={'/template-category/edit-template-category'}
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
