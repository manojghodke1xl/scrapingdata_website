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
    const { _id, name, email, service, subject, createdAt, updatedAt, site, url, campaign, medium, source, content, term, campaignId } = enquiry;

    return {
      id: _id,
      exportData: enquiry,
      name: <TruncatableFieldToolTip content={name} />,
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
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
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Customer Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Enquiry Service', key: 'service' },
                  { label: 'Subject', key: 'subject' },
                  { label: 'Sites', key: 'site' },
                  { label: 'URL', key: 'url' },
                  { label: 'Campaign Name', key: 'campaign' },
                  { label: 'Medium', key: 'medium' },
                  { label: 'Source', key: 'source' },
                  { label: 'Content', key: 'content' },
                  { label: 'Term', key: 'term' },
                  { label: 'Campaign ID', key: 'campaignId' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setEnquiries(data.enquiries)}
                exportData={enquiries}
                rows={rows}
                apiUrl={'enquiry'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                view={true}
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
        </div>
      </div>
      <NoteComponent note={enquiryListNote} />
    </div>
  );
};

export default EnquiryList;
