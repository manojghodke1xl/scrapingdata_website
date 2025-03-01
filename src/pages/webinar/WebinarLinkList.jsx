import { useState } from 'react';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import { formatDateTime } from '../../utils/dateFormats';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';

const WebinarLinkList = () => {
  const [webinarLinks, setWebinarLinks] = useState([]);

  const rows = webinarLinks.map((webinarLink) => {
    const { _id, link, createdAt, updatedAt } = webinarLink;
    return {
      id: _id,
      exportData: webinarLink,
      link: <TruncatableCopyFeild content={link} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Webinar Links'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Link', key: 'link' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setWebinarLinks(data.webinarLinks)}
                rows={rows}
                apiUrl={'webinar/links'}
                tableCountLabel={true}
                pagination={true}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarLinkList;
