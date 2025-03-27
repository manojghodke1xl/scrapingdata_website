import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { faqCategoryListNotes } from './FaqCategoryNotes';
import NoteComponent from '../../atoms/common/NoteComponent';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const FaqCategoryList = () => {
  const navigate = useNavigate();
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

  const actionItems = [{ id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/faq-category/edit-faq-category/${row.id}`) }];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'FAQ Categories'} btn1={true} href1={'/faq-category/add-faq-category'} icon1={<IoMdAdd />} btnLabel1={'Add FAQ Category'} />
      <TableComponent
        selectable={true}
        siteModule={'faq-category'}
        headers={columnConfig}
        tableData={(data) => setFaqCategories(data.faqCategories)}
        rows={rows}
        apiUrl={'faq-category'}
        pagination={true}
        search={true}
        actionItems={actionItems}
      />
      <NoteComponent note={faqCategoryListNotes} />
    </div>
  );
};

export default FaqCategoryList;
