import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteSubscriberApi } from '../../apis/leads/subscriber-apis';
import { mailingListNote } from './MailingNotes';
import NoteComponent from '../../atoms/common/NoteComponent';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const SubscribersList = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  const rows = lists.map((list) => {
    const { _id, email, createdAt, updatedAt, site, name, url, campaign, medium, source, content, term, campaignId } = list;
    return {
      id: _id,
      exportData: list,
      name: <TruncatableFieldToolTip content={name} />,
      email: <TruncatableFieldToolTip content={email} />,
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
    { id: 2, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 3, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 4, label: 'Campaign Name', key: 'campaign', dataKey: 'campaign' },
    { id: 5, label: 'Medium', key: 'medium', dataKey: 'medium' },
    { id: 6, label: 'Source', key: 'source', dataKey: 'source' },
    { id: 7, label: 'Content', key: 'content', dataKey: 'content' },
    { id: 8, label: 'Term', key: 'term', dataKey: 'term' },
    { id: 9, label: 'Campaign ID', key: 'campaignId', dataKey: 'campaignId' },
    { id: 10, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 11, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/subscriber/view-subscriber/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading="Newsletter Subscribers"
        btn1={true}
        href1={'/subscriber/subscriber-integration'}
        icon1={<AiOutlineApi />}
        btnLabel1={'API Integration'}
        btn2={true}
        href2={'/subscriber/add-subscriber'}
        icon2={<IoMdAdd />}
        btnLabel2={'Add Newsletter Subscriber'}
      />
      <TableComponent
        selectable={true}
        siteModule={'subscriber'}
        headers={columnConfig}
        tableData={(data) => setLists(data.lists)}
        rows={rows}
        apiUrl={'newsletter'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Email' }
        ]}
        deleteBtn={true}
        deleteLabel={'Delete Mailing List'}
        deleteMessage={'Are you sure you want to delete this subscriber list?'}
        deleteApi={deleteSubscriberApi}
        actionItems={actionItems}
      />
      <NoteComponent note={mailingListNote} />
    </div>
  );
};

export default SubscribersList;
