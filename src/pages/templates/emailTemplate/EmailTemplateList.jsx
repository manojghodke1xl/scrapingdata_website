import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../../utils/dateFormats';
import { deleteEmailTemplateApi } from '../../../apis/templates/template-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../../atoms/table/TableHeader';

const EmailTemplateList = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);

  const rows = emailTemplates.map((emailTemplate) => {
    const { _id, name, subject, site, createdAt, updatedAt } = emailTemplate;
    return {
      id: _id,
      exportData: emailTemplate,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      subject: <TruncatableFieldToolTip title={'Subject'} content={subject} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Email Templates'} btn1={true} href1={'/templates/add-email-template'} icon1={<IoMdAdd size={22} />} btnLabel1={'Add Email Template'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'email-templates'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Subject', key: 'subject' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setEmailTemplates(data.emailTemplates)}
                rows={rows}
                apiUrl={'template/email'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Subject' }
                ]}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                actions={true}
                edit={true}
                editPath={'/templates/edit-email-template'}
                copy={true}
                copyPath={'/templates/duplicate-email-template'}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteEmailTemplateApi}
                deleteLabel={'Delete Email Template'}
                deleteMessage={'Are you sure you want to delete this email template?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateList;
