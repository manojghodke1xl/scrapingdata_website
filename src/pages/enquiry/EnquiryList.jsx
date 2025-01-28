import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteEnquiryApi } from '../../apis/enquiry-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { enquiryListNote } from './EnquiryNotes';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  const rows = enquiries.map((enquiry) => {
    const { _id, name, email, service, subject, createdAt, updatedAt, site } = enquiry;
    return {
      id: _id,
      exportData: enquiry,
      name: <TruncatableFieldToolTip title={'Customer Name'} content={name} />,
      email: <TruncatableFieldToolTip title={'Customer Email'} content={email} />,
      service: <TruncatableFieldToolTip title={'Feedback Service'} content={service} />,
      subject: <TruncatableFieldToolTip title={'Subject'} content={subject} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
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
          icon1={<AiOutlineApi size={22} />}
          icon2={<IoMdAdd size={22} />}
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
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setEnquiries(data.enquiries)}
                exportData={enquiries}
                rows={rows}
                apiUrl={'enquiries'}
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
