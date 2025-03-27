import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../../utils/dateFormats';
import TableHeader from '../../../atoms/table/TableHeader';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { deleteDistributorApi } from '../../../apis/leads/distributor-apis';

const DistributorList = () => {
  const navigate = useNavigate();
  const [distributors, setDistributors] = useState([]);

  const rows = distributors.map((distributor) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId } = distributor;

    return {
      id: _id,
      exportData: distributor,
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
    { id: 2, label: 'Service', key: 'service', dataKey: 'service' },
    { id: 3, label: 'Subject', key: 'subject', dataKey: 'subject' },
    { id: 4, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 5, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 6, label: 'Campaign Name', key: 'campaign', dataKey: 'campaign' },
    { id: 7, label: 'Medium', key: 'medium', dataKey: 'medium' },
    { id: 8, label: 'Source', key: 'source', dataKey: 'source' },
    { id: 9, label: 'Content', key: 'content', dataKey: 'content' },
    { id: 10, label: 'Term', key: 'term', dataKey: 'term' },
    { id: 11, label: 'Campaign ID', key: 'campaignId', dataKey: 'campaignId' },
    { id: 12, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 13, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/distributor/view-distributor/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];
  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading="Distributors"
        btn2={true}
        btn1={true}
        href1={'/distributor/distributor-integration'}
        href2={'/distributor/add-distributor'}
        icon1={<AiOutlineApi />}
        icon2={<IoMdAdd />}
        btnLabel1={'API Integration'}
        btnLabel2={'Add Distributor'}
      />

      <TableComponent
        selectable={true}
        siteModule={'distributors'}
        headers={columnConfig}
        tableData={(data) => setDistributors(data.distributors)}
        exportData={distributors}
        rows={rows}
        apiUrl={'distributor'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Email' }
        ]}
        deleteBtn={true}
        deleteLabel="Delete Distributor"
        deleteMessage="Are you sure you want to delete this Distributor?"
        deleteApi={deleteDistributorApi}
        actionItems={actionItems}
      />
    </div>
  );
};

export default DistributorList;
