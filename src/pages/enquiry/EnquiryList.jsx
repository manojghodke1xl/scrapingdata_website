import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import NoteComponent from '../../atoms/common/NoteComponent';
import { enquiryListNote } from './EnquiryNotes';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { deleteEnquiryApi } from '../../apis/leads/enquiry-apis';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  const rows = enquiries.map((enquiry) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId, mobile, ccode } = enquiry;

    return {
      id: _id,
      exportData: enquiry,
      name: <TruncatableFieldToolTip content={name} />,
      number: <TruncatableFieldToolTip content={`${ccode ?? ''} ${mobile}`} />,
      email: <TruncatableFieldToolTip content={email} />,
      service: <TruncatableFieldToolTip content={service} />,
      subject: <TruncatableFieldToolTip content={subject} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      url: <TruncatableFieldToolTip content={url} />,
      campaign: <TruncatableFieldToolTip content={campaign} />,
      medium: <TruncatableFieldToolTip content={medium} />,
      source: <TruncatableFieldToolTip content={source} />,
      content: <TruncatableFieldToolTip content={content} />,
      term: <TruncatableFieldToolTip content={term} />,
      campaignId: <TruncatableFieldToolTip content={campaignId} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Customer Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
    { id: 2, label: 'Service', key: 'service', dataKey: 'service' },
    { id: 3, label: 'Contact Number', key: 'number', dataKey: 'number' },
    { id: 4, label: 'Subject', key: 'subject', dataKey: 'subject' },
    { id: 5, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    { id: 6, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 7, label: 'Campaign Name', key: 'campaign', dataKey: 'campaign' },
    { id: 8, label: 'Medium', key: 'medium', dataKey: 'medium' },
    { id: 9, label: 'Source', key: 'source', dataKey: 'source' },
    { id: 10, label: 'Content', key: 'content', dataKey: 'content' },
    { id: 11, label: 'Term', key: 'term', dataKey: 'term' },
    { id: 12, label: 'Campaign ID', key: 'campaignId', dataKey: 'campaignId' },
    { id: 13, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 14, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <div className=" w-full">
        <TableHeader
          heading="Enquiry"
          btn2={true}
          btn1={true}
          href1={'/enquiry/enquiry-integration'}
          href2={'/enquiry/add-enquiry'}
          icon1={<AiOutlineApi />}
          icon2={<IoMdAdd />}
          btnLabel1={'API Integration'}
          btnLabel2={'Add Enquiry'}
        />
        <div className="flex flex-col min-w-full align-middle overflow-x-auto">
          <TableComponent
            selectable={true}
            siteModule={'enquiry'}
            headers={columnConfig}
            tableData={(data) => setEnquiries(data.enquiries)}
            exportData={enquiries}
            rows={rows}
            apiUrl={'enquiry'}
            tableCountLabel={true}
            pagination={true}
            actions={true}
            viewPath={'/enquiry/view-enquiry'}
            search={true}
            filter={true}
            filterCategory={[{ id: 0, name: 'Sites' }]}
            searchCategory={[
              { id: 0, name: 'Name' },
              { id: 1, name: 'Email' }
            ]}
            deleteBtn={true}
            deleteAction={true}
            deleteLabel="Delete Enquiry"
            deleteMessage="Are you sure you want to delete this enquiry?"
            deleteApi={deleteEnquiryApi}
          />
        </div>
      </div>
      <NoteComponent note={enquiryListNote} />
    </div>
  );
};

export default EnquiryList;
