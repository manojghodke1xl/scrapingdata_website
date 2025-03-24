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

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 2, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Certificates'} btn1={true} href1={'/certificates/add-certificate'} icon1={<IoMdAdd />} btnLabel1={'Add Certificate'} />
      <TableComponent
        selectable={true}
        siteModule={'certificate'}
        headers={columnConfig}
        tableData={(data) => setCertificates(data.certificates)}
        rows={rows}
        apiUrl={'certificate'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/certificates/edit-certificate'}
        copyPath={'/certificates/duplicate-certificate'}
        deleteBtn={true}
        deleteAction={true}
        deleteLabel={'Delete Certificate'}
        deleteMessage={'Are you sure you want to delete this Certificate?'}
        deleteApi={deleteCertificatesApi}
        search={true}
      />
    </div>
  );
};

export default CertificateList;
