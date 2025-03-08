import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import { deleteUtmBuildersApi } from '../../apis/utm-builder-apis';

const UTMBuilderList = () => {
  const [UTMList, setUTMList] = useState([]);

  const rows = UTMList.map((utm) => {
    const { _id, url, name, medium, source, content, term, campaignId, createdAt, updatedAt } = utm;

    const query = [];
    if (name) query.push(`utm_campaign=${name}`);
    if (medium) query.push(`utm_medium=${medium}`);
    if (source) query.push(`utm_source=${source}`);
    if (content) query.push(`utm_content=${content}`);
    if (term) query.push(`utm_term=${term}`);
    if (campaignId) query.push(`utm_id=${campaignId}`);

    const completeUrl = `${url}${query.length ? `?${query.join('&')}` : ''}`;

    return {
      id: _id,
      exportData: utm,
      url: <TruncatableCopyFeild content={completeUrl} />,
      campaignId: <TruncatableFieldToolTip content={campaignId} />,
      name: <TruncatableFieldToolTip content={name} />,
      host: <TruncatableFieldToolTip content={url} />,
      medium: <TruncatableFieldToolTip content={medium} />,
      source: <TruncatableFieldToolTip content={source} />,
      content: <TruncatableFieldToolTip content={content} />,
      term: <TruncatableFieldToolTip content={term} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    {
      id: 0,
      label: 'URL',
      key: 'url',
      dataKey: 'url',
      formatForExport: (val, data) => {
        const query = [];
        if (data.name) query.push(`utm_campaign=${data.name}`);
        if (data.medium) query.push(`utm_medium=${data.medium}`);
        if (data.source) query.push(`utm_source=${data.source}`);
        if (data.content) query.push(`utm_content=${data.content}`);
        if (data.term) query.push(`utm_term=${data.term}`);
        if (data.campaignId) query.push(`utm_id=${data.campaignId}`);

        const completeUrl = `${val}${query.length ? `?${query.join('&')}` : ''}`;
        return completeUrl;
      }
    },
    { id: 1, label: 'Campaign Id', key: 'campaignId', dataKey: 'campaignId' },
    { id: 2, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 3, label: 'Host', key: 'host', dataKey: 'host' },
    { id: 4, label: 'Medium', key: 'medium', dataKey: 'medium' },
    { id: 5, label: 'Source', key: 'source', dataKey: 'source' },
    { id: 6, label: 'Content', key: 'content', dataKey: 'content' },
    { id: 7, label: 'Term', key: 'term', dataKey: 'term' },
    { id: 8, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 9, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'UTM Builder'} btn1={true} href1={'/utm-builder/add-utm-builder'} icon1={<IoMdAdd />} btnLabel1={'Add UTM Builder'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'utm-builder'}
                headers={columnConfig}
                tableData={(data) => setUTMList(data.utmBuilders)}
                rows={rows}
                apiUrl={'utm-builder'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/utm-builder/edit-utm-builder'}
                copyPath={'/utm-builder/duplicate-utm-builder'}
                search={true}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteUtmBuildersApi}
                deleteLabel={'Delete UTM Builder'}
                deleteMessage={'Are you sure you want to delete this UTM Builder?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMBuilderList;
