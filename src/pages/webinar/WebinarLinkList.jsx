import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const WebinarLinkList = () => {
  const [webinarLinks, setWebinarLinks] = useState([]);

  const rows = webinarLinks.map((webinarLink) => {
    const { _id, link, webinar, site, createdAt, updatedAt } = webinarLink;
    return {
      id: _id,
      exportData: webinarLink,
      name: <TruncatableFieldToolTip content={webinar.name} />,
      link: <TruncatableFieldToolTip content={link} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'webinar.name' },
    { id: 1, label: 'Link', key: 'link', dataKey: 'link' },
    { id: 2, label: 'Site', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 3, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 4, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Webinar Links'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'webinar-links'}
                headers={columnConfig}
                tableData={(data) => setWebinarLinks(data.webinarLinks)}
                rows={rows}
                apiUrl={'webinar/links'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarLinkList;
