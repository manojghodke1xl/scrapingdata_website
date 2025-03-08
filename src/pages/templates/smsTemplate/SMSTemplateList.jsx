import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../../utils/dateFormats';
import { deleteSmsTemplateApi } from '../../../apis/templates/template-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../../atoms/table/TableHeader';

const SMSTemplateList = () => {
  const [SMSTemplates, setSMSTemplates] = useState([]);

  const rows = SMSTemplates.map((smsTemplate) => {
    const { _id, name, site, createdAt, updatedAt } = smsTemplate;
    return {
      id: _id,
      exportData: smsTemplate,
      name: <TruncatableFieldToolTip content={name} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'SMS Templates'} btn1={true} href1={'/templates/add-sms-template'} icon1={<IoMdAdd />} btnLabel1={'Add SMS Template'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'sms-templates'}
                headers={columnConfig}
                tableData={(data) => setSMSTemplates(data.smsTemplates)}
                rows={rows}
                apiUrl={'template/sms'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                searchCategory={[{ id: 0, name: 'Name' }]}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                actions={true}
                editPath={'/templates/edit-sms-template'}
                copyPath={'/templates/duplicate-sms-template'}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteSmsTemplateApi}
                deleteLabel={'Delete SMS Template'}
                deleteMessage={'Are you sure you want to delete this SMS template?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSTemplateList;
