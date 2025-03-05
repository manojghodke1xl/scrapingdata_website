import { useState } from 'react';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../../utils/dateFormats';
import TableHeader from '../../../atoms/table/TableHeader';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { deleteAdvertisementApi } from '../../../apis/leads/advertisement-apis';

const AdvertisementList = () => {
  const [advertisements, setAdvertisements] = useState([]);

  const rows = advertisements.map((advertisement) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId } = advertisement;

    return {
      id: _id,
      exportData: advertisement,
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader
          heading="Advertisements"
          btn2={true}
          btn1={true}
          href1={'/advertisement/advertisement-integration'}
          href2={'/advertisement/add-advertisement'}
          icon1={<AiOutlineApi />}
          icon2={<IoMdAdd />}
          btnLabel1={'API Integration'}
          btnLabel2={'Add Advertisement'}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'advertisement'}
                headers={[
                  { id: 0, label: 'Customer Name', key: 'name' },
                  { id: 1, label: 'Email', key: 'email' },
                  { id: 2, label: 'Enquiry Service', key: 'service' },
                  { id: 3, label: 'Subject', key: 'subject' },
                  { id: 4, label: 'Sites', key: 'site' },
                  { id: 5, label: 'URL', key: 'url' },
                  { id: 6, label: 'Campaign Name', key: 'campaign' },
                  { id: 7, label: 'Medium', key: 'medium' },
                  { id: 8, label: 'Source', key: 'source' },
                  { id: 9, label: 'Content', key: 'content' },
                  { id: 10, label: 'Term', key: 'term' },
                  { id: 11, label: 'Campaign ID', key: 'campaignId' },
                  { id: 12, label: 'Created Date', key: 'createdAt' },
                  { id: 13, label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setAdvertisements(data.advertisements)}
                exportData={advertisements}
                rows={rows}
                apiUrl={'advertisement'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                viewPath={'/advertisement/view-advertisement'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Email' }
                ]}
                deleteBtn={true}
                deleteAction={true}
                deleteLabel="Delete Advertisement"
                deleteMessage="Are you sure you want to delete this Advertisement?"
                deleteApi={deleteAdvertisementApi}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementList;
