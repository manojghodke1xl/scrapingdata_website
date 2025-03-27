import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { formatDateTime } from '../../../utils/dateFormats';
import { deleteEmailTemplateApi } from '../../../apis/templates/template-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../../atoms/table/TableHeader';

const EmailTemplateList = () => {
  const navigate = useNavigate();
  const [emailTemplates, setEmailTemplates] = useState([]);

  const rows = emailTemplates.map((emailTemplate) => {
    const { _id, name, subject, body, site, createdAt, updatedAt } = emailTemplate;
    return {
      id: _id,
      exportData: emailTemplate,
      name: <TruncatableFieldToolTip content={name} />,
      subject: <TruncatableFieldToolTip content={subject} />,
      body: <TruncatableFieldToolTip content={body} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Subject', key: 'subject', dataKey: 'subject' },
    { id: 2, label: 'Body', key: 'body', dataKey: 'body' },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 4, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 5, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/templates/edit-email-template/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/templates/duplicate-email-template/${row.id}`) },
    { id: 2, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Email Templates'} btn1={true} href1={'/templates/add-email-template'} icon1={<IoMdAdd />} btnLabel1={'Add Email Template'} />
      <TableComponent
        selectable={true}
        siteModule={'email-templates'}
        headers={columnConfig}
        tableData={(data) => setEmailTemplates(data.emailTemplates)}
        rows={rows}
        apiUrl={'template/email'}
        pagination={true}
        search={true}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Subject' }
        ]}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        deleteBtn={true}
        deleteApi={deleteEmailTemplateApi}
        deleteLabel={'Delete Email Template'}
        deleteMessage={'Are you sure you want to delete this email template?'}
        actionItems={actionItems}
      />
    </div>
  );
};

export default EmailTemplateList;
