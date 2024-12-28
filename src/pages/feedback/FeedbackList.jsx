import { useState } from 'react';
import useGetAllSites from '../../hooks/useGetAllSites';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { Link } from 'react-router-dom';
import { deleteFeedbackApi } from '../../apis/feedback-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listFeedbackNote } from './FeedbackNote';
import { AiOutlineApi } from 'react-icons/ai';

const FeedbackList = () => {
  const allsites = useGetAllSites();
  const [feedbacks, setFeedbacks] = useState([]);

  const rows = feedbacks.map((feedback) => {
    const { _id, name, email, ccode, mobile, service, subject, feedbackMessage, createdAt, updatedAt, site } = feedback;

    return {
      id: _id,
      name: <TruncatableFieldModal title={'Customer Name'} content={name} />,
      email: <TruncatableFieldModal title={'Email'} content={email} />,
      mobile: <TruncatableFieldModal title={'Phone Number'} content={`${ccode ?? ''} ${mobile ?? ''}`} maxLength={15} />,
      service: <TruncatableFieldModal title={'Feedback Service'} content={service} />,
      subject: <TruncatableFieldModal title={'Subject'} content={subject} maxLength={20} />,
      feedbackMessage: <TruncatableFieldModal title={'Message'} content={feedbackMessage} maxLength={50} />,
      sites: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Feedback List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/feedback/feedback-integration" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <AiOutlineApi size={22} />
              <span className="hidden md:block">API Integration</span>
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
                  { label: 'Customer Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Phone Number', key: 'mobile' },
                  { label: 'Feedback Service', key: 'service' },
                  { label: 'Subject', key: 'subject' },
                  { label: 'Message', key: 'feedbackMessage' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setFeedbacks(data.feedbacks)}
                rows={rows}
                apiUrl={'feedback'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                view={true}
                viewPath={'/feedback/view-feedback'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                allsites={allsites}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Email' },
                  { id: 2, name: 'Phone Number' },
                  { id: 3, name: 'Feedback Service' },
                  { id: 4, name: 'Subject' },
                  { id: 5, name: 'Site' }
                ]}
                deleteBtn={true}
                deleteLabel={'Delete Feedback'}
                deleteMessage={'Are you sure you want to delete this feedback?'}
                deleteApiUrl={deleteFeedbackApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={listFeedbackNote} />
    </div>
  );
};

export default FeedbackList;
