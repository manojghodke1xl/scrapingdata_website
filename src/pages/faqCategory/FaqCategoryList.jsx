import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { faqCategoryListNotes } from './FaqCategoryNotes';
import NoteComponent from '../../atoms/common/NoteComponent';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const FaqCategoryList = () => {
  const [faqCategories, setFaqCategories] = useState([]);

  const rows = faqCategories.map((faqCategory) => {
    const { _id, name, createdAt, updatedAt } = faqCategory;
    return {
      id: _id,
      exportData: faqCategory,
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'FAQ Categories'} btn1={true} href1={'/faq-category/add-faq-category'} icon1={<IoMdAdd />} btnLabel1={'Add FAQ Category'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'faq-category'}
                headers={columnConfig}
                tableData={(data) => setFaqCategories(data.faqCategories)}
                rows={rows}
                apiUrl={'faq-category'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/faq-category/edit-faq-category'}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={faqCategoryListNotes} />
    </div>
  );
};

export default FaqCategoryList;
