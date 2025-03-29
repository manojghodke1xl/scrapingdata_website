import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const CampaignList = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  const rows = campaigns?.map((campaign) => {
    const { _id, site, campaigns, createdAt, updatedAt } = campaign;
    return {
      id: _id,
      exportData: campaign,
      campaigns: <TruncatableFieldToolTip content={campaigns.length} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Follow Ups', key: 'campaigns', dataKey: 'campaigns', formatForExport: (value) => value?.length },
    { id: 1, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    {
      id: 2,
      label: 'Created Date',
      key: 'createdAt',
      dataKey: 'createdAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 3,
      label: 'Updated Date',
      key: 'updatedAt',
      dataKey: 'updatedAt',
      formatForExport: (value) => formatDateTime(value)
    }
  ];
  console.log('the campaigns are', campaigns);

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/campaign/edit-campaign/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/campaign/duplicate-campaign/${row.id}`) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Campaign'} btn1={true} href1={'/campaign/add-campaign'} icon1={<IoMdAdd />} btnLabel1={'Add Campaign'} />
      <TableComponent
        siteModule={'campaign'}
        selectable={true}
        headers={columnConfig}
        tableData={(data) => setCampaigns(data.campaigns)}
        rows={rows}
        apiUrl={'campaign'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        actionItems={actionItems}
      />
    </div>
  );
};

export default CampaignList;
