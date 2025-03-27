import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { IoMdRefresh } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { formatDateTime } from '../../../utils/dateFormats';
import { deleteWhatsAppTemplateApi, getWhatsAppTemplateApprovalApi, getWhatsAppTemplateRefreshApi } from '../../../apis/templates/template-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../../atoms/table/TableHeader';
import useColorContext from '../../../hooks/useColorContext';

const WhatsAppTemplateList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useColorContext();
  const [whatsAppTemplates, setWhatsAppTemplates] = useState([]);
  const [fetchRefresh, setFetchRefresh] = useState(false);

  const whatsappRefresh = async (id) => {
    await getWhatsAppTemplateRefreshApi(id);
    setFetchRefresh((r) => !r);
  };

  const rows = whatsAppTemplates.map((whatsAppTemplate) => {
    const { _id, name, site, whatsAppTemplateName, message, status, createdAt, updatedAt } = whatsAppTemplate;

    return {
      id: _id,
      approvedTemplate: status === 'APPROVED',
      exportData: whatsAppTemplate,
      name: <TruncatableFieldToolTip content={name} />,
      whatsAppTemplateName: <TruncatableFieldToolTip content={whatsAppTemplateName} />,
      message: <TruncatableFieldToolTip content={message} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      status: status ? (
        <div
          className={`rounded-xl ${
            status === 'APPROVED'
              ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
              : status === 'REJECTED'
              ? `${isDarkMode ? 'border border-failed ' : 'bg-fadedred'} text-failed`
              : `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'APPROVED' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status}</span>
          {status !== 'APPROVED' && status !== 'REJECTED' && (
            <span onClick={() => whatsappRefresh(_id)}>
              <IoMdRefresh />
            </span>
          )}
        </div>
      ) : (
        <span onClick={() => whatsappRefresh(_id)}>
          <IoMdRefresh />
        </span>
      ),

      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'WhatsApp Template Name', key: 'whatsAppTemplateName', dataKey: 'whatsAppTemplateName' },
    { id: 2, label: 'Message', key: 'message', dataKey: 'message' },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => `${value?.name} (${value?.host})` },
    { id: 4, label: 'Status', key: 'status', dataKey: 'status' },
    { id: 5, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 6, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/templates/edit-whatsapp-template/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/templates/duplicate-whatsapp-template/${row.id}`) },
    { id: 2, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'WhatsApp Templates'} btn1={true} href1={'/templates/add-whatsapp-template'} icon1={<IoMdAdd />} btnLabel1={'Add WhatsApp Template'} />
      <TableComponent
        selectable={true}
        siteModule={'whats-app-templates'}
        headers={columnConfig}
        tableData={(data) => setWhatsAppTemplates(data.whatsappTemplates)}
        rows={rows}
        apiUrl={'template/whatsapp'}
        pagination={true}
        search={true}
        searchCategory={[{ id: 0, name: 'Name' }]}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        deleteBtn={true}
        deleteApi={deleteWhatsAppTemplateApi}
        deleteLabel={'Delete WhatsApp Template'}
        deleteMessage={'Are you sure you want to delete this WhatsApp template?'}
        sendForApproval={true}
        approvalApi={getWhatsAppTemplateApprovalApi}
        fetchRefresh={fetchRefresh}
        isWhatsAppTemplate={true}
        actionItems={actionItems}
      />
    </div>
  );
};

export default WhatsAppTemplateList;
