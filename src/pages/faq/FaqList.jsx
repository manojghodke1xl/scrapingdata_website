import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteFaqApi, updateFaqSitesApi, updateFaqStatusApi } from '../../apis/faq-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { faqListNote } from './faqNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { useColor } from '../../contexts/contexts/ColorContext';

const FaqList = () => {
  const { isDarkMode } = useColor();
  const [faqs, setFaqs] = useState([]);

  const rows = faqs.map((faq) => {
    const { _id, question, answer, isActive, sites, createdAt, updatedAt } = faq;
    return {
      id: _id,
      exportData: faq,
      sites: <TruncatableFieldToolTip title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      question: <TruncatableFieldToolTip title={'Question'} content={question} />,
      answer: <TruncatableFieldToolTip title={'Answer'} content={answer} />,
      isActive: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-[#027948]' : 'bg-[#ECFDF3]'} text-[#027948]` : `${isDarkMode ? 'border border-[#344054]' : 'bg-[#F2F4F7]'} text-[#344054]`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'FAQs'} btn1={true} href1={'/faq/add-faq'} icon1={<IoMdAdd />} btnLabel1={'Add FAQ'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'faq'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Question', key: 'question' },
                  { label: 'Answer', key: 'answer' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setFaqs(data.faqs)}
                rows={rows}
                apiUrl={'faq'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/faq/edit-faq'}
                copy={true}
                copyPath={'/faq/duplicate-faq'}
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
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={faqListNote} />
    </div>
  );
};

export default FaqList;
