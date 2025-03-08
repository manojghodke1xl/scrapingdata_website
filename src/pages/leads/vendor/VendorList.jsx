import { useState } from 'react';
import { deleteVendorApi } from '../../../apis/leads/vendor-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../../utils/dateFormats';
import TableHeader from '../../../atoms/table/TableHeader';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  const rows = vendors.map((vendor) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId } = vendor;

    return {
      id: _id,
      exportData: vendor,
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader
          heading="Vendors"
          btn2={true}
          btn1={true}
          href1={'/vendor/vendor-integration'}
          href2={'/vendor/add-vendor'}
          icon1={<AiOutlineApi />}
          icon2={<IoMdAdd />}
          btnLabel1={'API Integration'}
          btnLabel2={'Add Vendor'}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'vendor'}
                headers={columnConfig}
                tableData={(data) => setVendors(data.vendors)}
                exportData={vendors}
                rows={rows}
                apiUrl={'vendor'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                viewPath={'/vendor/view-vendor'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Email' }
                ]}
                deleteBtn={true}
                deleteAction={true}
                deleteLabel="Delete Vendor"
                deleteMessage="Are you sure you want to delete this vendor?"
                deleteApi={deleteVendorApi}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorList;
