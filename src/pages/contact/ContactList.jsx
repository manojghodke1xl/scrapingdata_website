import { useState } from 'react';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import TableHeader from '../../atoms/table/TableHeader';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import CountryFlag from '../../atoms/common/CountryFlag';
import { CiExport } from 'react-icons/ci';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const rows = contacts.map((contact) => {
    const { _id, name, email, phone, phoneCode, sites, createdAt, updatedAt } = contact;
    return {
      id: _id,
      exportData: contact,
      name: <TruncatableFieldToolTip content={name} />,
      email: <TruncatableFieldToolTip content={email} />,
      phoneCode: <CountryFlag dialingCode={phoneCode?.startsWith('+') ? phoneCode.slice(1) : phoneCode} />,
      phone: <TruncatableFieldToolTip content={`${phoneCode ? (phoneCode?.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phone ? phone : '-'}`} />,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
    { id: 6, label: 'Country', key: 'phoneCode', dataKey: 'phoneCode' },
    {
      id: 2,
      label: 'Contact Number',
      key: 'phone',
      dataKey: 'phone',
      formatForExport: (value, data) => `${data.phoneCode ? (data.phoneCode?.startsWith('+') ? data.phoneCode : `+${data.phoneCode}`) : ''} ${value ? value : '-'}`
    },
    { id: 3, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 4, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 5, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader
          heading={'Contacts'}
          btn1={true}
          href1={'/contact/add-contact'}
          icon1={<IoMdAdd />}
          btnLabel1={'Add Contact'}
          btn2={true}
          href2={'/contact/import-contacts'}
          icon2={<CiExport strokeWidth={0.5} />}
          btnLabel2={'Import Contacts'}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'contact'}
                headers={columnConfig}
                tableData={(data) => setContacts(data.contacts)}
                rows={rows}
                apiUrl={'contact'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/contact/edit-contact'}
                search={true}
                filter={true}
                filterCategory={[{ id: 1, name: 'Sites' }]}
                searchCategory={[
                  { id: 1, name: 'Name' },
                  { id: 2, name: 'Email' }
                ]}
                adminStatus={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
