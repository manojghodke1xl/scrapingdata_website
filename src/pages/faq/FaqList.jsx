import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteFaqApi, updateFaqSitesApi, updateFaqStatusApi } from '../../apis/faq-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { faqListNote } from './faqNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const FaqList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useColorContext();
  const [faqs, setFaqs] = useState([]);

  const rows = faqs.map((faq) => {
    const { _id, question, answer, isActive, sites, createdAt, updatedAt } = faq;
    return {
      id: _id,
      exportData: faq,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      question: <TruncatableFieldToolTip content={question} />,
      answer: <TruncatableFieldToolTip content={answer} />,
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
    { id: 0, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 1, label: 'Question', key: 'question', dataKey: 'question' },
    { id: 2, label: 'Answer', key: 'answer', dataKey: 'answer' },
    { id: 3, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 4, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 5, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/faq/edit-faq/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/faq/duplicate-faq/${row.id}`) },
    { id: 2, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'FAQs'} btn1={true} href1={'/faq/add-faq'} icon1={<IoMdAdd />} btnLabel1={'Add FAQ'} />
      <TableComponent
        selectable={true}
        siteModule={'faq'}
        headers={columnConfig}
        tableData={(data) => setFaqs(data.faqs)}
        rows={rows}
        apiUrl={'faq'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[
          { id: 0, name: 'Sites' },
          { id: 1, name: 'Status' }
        ]}
        statuses={[
          { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
          { id: 1, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
        ]}
        searchCategory={[
          { id: 0, name: 'Question' },
          { id: 1, name: 'Answer' }
        ]}
        modifyStatus={true}
        modifyStatusApi={updateFaqStatusApi}
        modifySite={true}
        modifySiteApi={updateFaqSitesApi}
        deleteBtn={true}
        deleteLabel={'Delete FAQ'}
        deleteMessage={'Are you sure you want to delete this FAQ?'}
        deleteApi={deleteFaqApi}
        actionItems={actionItems}
      />
      <NoteComponent note={faqListNote} />
    </div>
  );
};

export default FaqList;
