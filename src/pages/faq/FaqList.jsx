import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteFaqApi, updateFaqSitesApi, updateFaqStatusApi } from '../../apis/faq-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { faqListNote } from './faqNotes';

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);

  const rows = faqs.map((faq) => {
    const { _id, question, answer, isActive, sites, createdAt, updatedAt } = faq;
    return {
      id: _id,
      exportData: faq,
      sites: <TruncatableFieldModal title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      question: <TruncatableFieldModal title={'Question'} content={question} />,
      answer: <TruncatableFieldModal title={'Answer'} content={answer} />,
      isActive: (
        <div className={`rounded-xl ${isActive ? 'bg-[#ECFDF3] text-[#027948]' : 'bg-[#F2F4F7] text-[#344054]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All FAQ List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/faq/add-faq" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add FAQ</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'faq'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
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
