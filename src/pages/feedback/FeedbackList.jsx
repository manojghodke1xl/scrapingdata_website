import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteFeedbackApi } from '../../apis/leads/feedback-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { feedbackListNote } from './FeedbackNote';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const rows = feedbacks.map((feedback) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId } = feedback;

    return {
      id: _id,
      exportData: feedback,
      name: <TruncatableFieldToolTip title={'Customer Name'} content={name} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email} />,
      service: <TruncatableFieldToolTip title={'Feedback Service'} content={service} />,
      subject: <TruncatableFieldToolTip title={'Subject'} content={subject} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      url: <TruncatableFieldToolTip content={url} />,
      campaign: <TruncatableFieldToolTip content={campaign} />,
      medium: <TruncatableFieldToolTip content={medium} />,
      source: <TruncatableFieldToolTip content={source} />,
      content: <TruncatableFieldToolTip content={content} />,
      term: <TruncatableFieldToolTip content={term} />,
      campaignId: <TruncatableFieldToolTip content={campaignId} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader
          heading={'Feedbacks'}
          btn1={true}
          href1={'/feedback/feedback-integration'}
          icon1={<AiOutlineApi />}
          btnLabel1={'API Integration'}
          btn2={true}
          href2={'/feedback/add-feedback'}
          icon2={<IoMdAdd />}
          btnLabel2={'Add Enquiry'}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Customer Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Feedback Service', key: 'service' },
                  { label: 'Subject', key: 'subject' },
                  { label: 'Sites', key: 'site' },
                  { label: 'URL', key: 'url' },
                  { label: 'Campaign Name', key: 'campaign' },
                  { label: 'Medium', key: 'medium' },
                  { label: 'Source', key: 'source' },
                  { label: 'Content', key: 'content' },
                  { label: 'Term', key: 'term' },
                  { label: 'Campaign ID', key: 'campaignId' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setFeedbacks(data.feedbacks)}
                rows={rows}
                apiUrl={'feedback'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                viewPath={'/feedback/view-feedback'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Email' },
                  { id: 2, name: 'Phone Number' },
                  { id: 3, name: 'Feedback Service' },
                  { id: 4, name: 'Subject' },
                  { id: 5, name: 'Site' }
                ]}
                deleteBtn={true}
                deleteAction={true}
                deleteLabel={'Delete Feedback'}
                deleteMessage={'Are you sure you want to delete this feedback?'}
                deleteApi={deleteFeedbackApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={feedbackListNote} />
    </div>
  );
};

export default FeedbackList;
