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
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Key', key: 'key', dataKey: '_id' },
    { id: 1, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Template Categories'} btn1={true} href1={'/template-category/add-template-category'} icon1={<IoMdAdd />} btnLabel1={'Add Template Category'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'template-category'}
                headers={columnConfig}
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
