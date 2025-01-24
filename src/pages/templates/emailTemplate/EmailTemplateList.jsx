import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TableComponent from '../../../atoms/table/Table';
import { useState } from 'react';
import TruncatableFieldModal from '../../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../../utils/dateFormats';
import { deleteEmailTemplateApi } from '../../../apis/templates/email-template-apis';

const EmailTemplateList = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);

  const rows = emailTemplates.map((emailTemplate) => {
    const { _id, name, subject, site, createdAt, updatedAt } = emailTemplate;
    return {
      id: _id,
      exportData: emailTemplate,
      name: <TruncatableFieldModal title={'Name'} content={name} />,
      subject: <TruncatableFieldModal title={'Subject'} content={subject} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Email Templates</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/templates/add-email-template" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Email Template</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'email-templates'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Subject', key: 'subject' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setEmailTemplates(data.emailTemplates)}
                rows={rows}
                apiUrl={'email-templates'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                actions={true}
                edit={true}
                editPath={'/templates/edit-email-template'}
                deleteBtn={true}
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
