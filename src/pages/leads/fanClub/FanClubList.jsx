import { useState } from 'react';
import { deleteFanClubApi } from '../../../apis/leads/fanClub-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../../utils/dateFormats';
import TableHeader from '../../../atoms/table/TableHeader';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';

const FanClubList = () => {
  const [fanClubs, setFanClubs] = useState([]);

  const rows = fanClubs.map((fanClub) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId } = fanClub;

    return {
      id: _id,
      exportData: fanClub,
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
          heading="Fan Clubs"
          btn2={true}
          btn1={true}
          href1={'/fan-club/fan-club-integration'}
          href2={'/fan-club/add-fan-club'}
          icon1={<AiOutlineApi />}
          icon2={<IoMdAdd />}
          btnLabel1={'API Integration'}
          btnLabel2={'Add Fan Club'}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'fan-club'}
                headers={[
                  { label: 'Customer Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Enquiry Service', key: 'service' },
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
                tableData={(data) => setFanClubs(data.fanClubs)}
                exportData={fanClubs}
                rows={rows}
                apiUrl={'fan-club'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                viewPath={'/fan-club/view-fan-club'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Email' }
                ]}
                deleteBtn={true}
                deleteAction={true}
                deleteLabel="Delete Fan Club"
                deleteMessage="Are you sure you want to delete this Fan Club?"
                deleteApi={deleteFanClubApi}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanClubList;
