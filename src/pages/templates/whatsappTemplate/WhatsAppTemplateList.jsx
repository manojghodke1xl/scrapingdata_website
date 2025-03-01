import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoMdRefresh } from 'react-icons/io';
import TableComponent from '../../../atoms/table/Table';
import { formatDateTime } from '../../../utils/dateFormats';
import { deleteWhatsAppTemplateApi, getWhatsAppTemplateApprovalApi, getWhatsAppTemplateRefreshApi } from '../../../apis/templates/template-apis';
import TruncatableFieldToolTip from '../../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../../atoms/table/TableHeader';
import useColorContext from '../../../hooks/useColorContext';

const WhatsAppTemplateList = () => {
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
      whatsAppTemplateName,
      approvedTemplate: status === 'APPROVED',
      exportData: whatsAppTemplate,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      message: <TruncatableFieldToolTip title={'Message'} content={message} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'WhatsApp Templates'} btn1={true} href1={'/templates/add-whatsapp-template'} icon1={<IoMdAdd />} btnLabel1={'Add WhatsApp Template'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'whats-app-templates'}
                headers={[
                  { label: 'Name', key: 'name' },
                  { label: 'WhatsApp Template Name', key: 'whatsAppTemplateName' },
                  { label: 'Message', key: 'message' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setWhatsAppTemplates(data.whatsappTemplates)}
                rows={rows}
                apiUrl={'template/whatsapp'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                searchCategory={[{ id: 0, name: 'Name' }]}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                actions={true}
                editPath={'/templates/edit-whatsapp-template'}
                copyPath={'/templates/duplicate-whatsapp-template'}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteWhatsAppTemplateApi}
                deleteLabel={'Delete WhatsApp Template'}
                deleteMessage={'Are you sure you want to delete this WhatsApp template?'}
                sendForApproval={true}
                approvalApi={getWhatsAppTemplateApprovalApi}
                fetchRefresh={fetchRefresh}
                isWhatsAppTemplate={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppTemplateList;
