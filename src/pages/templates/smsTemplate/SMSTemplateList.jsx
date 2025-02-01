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
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'SMS Templates'} btn1={true} href1={'/templates/add-sms-template'} icon1={<IoMdAdd size={22} />} btnLabel1={'Add SMS Template'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'sms-templates'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
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
                edit={true}
                editPath={'/templates/edit-sms-template'}
                deleteBtn={true}
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
