import { useState } from 'react';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import TableHeader from '../../atoms/table/TableHeader';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteCertificatesApi } from '../../apis/certificate-apis';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  const rows = certificates.map((cetificate) => {
    const { _id, name, createdAt, updatedAt } = cetificate;
    return {
      id: _id,
      exportData: cetificate,
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Certificates'} btn1={true} href1={'/certificates/add-certificate'} icon1={<IoMdAdd size={22} />} btnLabel1={'Add Certificate'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setCertificates(data.certificates)}
                rows={rows}
                apiUrl={'certificate'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/certificates/edit-certificate'}
                copy={true}
                copyPath={'/certificates/duplicate-certificate'}
                deleteBtn={true}
                deleteAction={true}
                deleteLabel={'Delete Certificate'}
                deleteMessage={'Are you sure you want to delete this Certificate?'}
                deleteApi={deleteCertificatesApi}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateList;
