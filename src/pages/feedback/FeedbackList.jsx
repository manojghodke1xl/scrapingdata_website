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
      name: <TruncatableFieldToolTip content={name} />,
      email: <TruncatableFieldToolTip content={email} />,
      service: <TruncatableFieldToolTip content={service} />,
      subject: <TruncatableFieldToolTip content={subject} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
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

  const columnConfig = [
    { id: 0, label: 'Customer Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
    { id: 2, label: 'Feedback Service', key: 'service', dataKey: 'service' },
    { id: 3, label: 'Subject', key: 'subject', dataKey: 'subject' },
    { id: 4, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 5, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 6, label: 'Campaign', key: 'campaign', dataKey: 'campaign' },
    { id: 7, label: 'Medium', key: 'medium', dataKey: 'medium' },
    { id: 8, label: 'Source', key: 'source', dataKey: 'source' },
    { id: 9, label: 'Content', key: 'content', dataKey: 'content' },
    { id: 10, label: 'Term', key: 'term', dataKey: 'term' },
    { id: 11, label: 'Campaign ID', key: 'campaignId', dataKey: 'campaignId' },
    { id: 12, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 13, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading={'Feedbacks'}
        btn1={true}
        href1={'/feedback/feedback-integration'}
        icon1={<AiOutlineApi />}
        btnLabel1={'API Integration'}
        btn2={true}
        href2={'/feedback/add-feedback'}
        icon2={<IoMdAdd />}
        btnLabel2={'Add Feedback'}
      />
      <TableComponent
        selectable={true}
        siteModule={'feedback'}
        headers={columnConfig}
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
          { id: 2, name: 'Service' },
          { id: 3, name: 'Subject' },
          { id: 4, name: 'Site' }
        ]}
        deleteBtn={true}
        deleteAction={true}
        deleteLabel={'Delete Feedback'}
        deleteMessage={'Are you sure you want to delete this feedback?'}
        deleteApi={deleteFeedbackApi}
      />
      <NoteComponent note={feedbackListNote} />
    </div>
  );
};

export default FeedbackList;
