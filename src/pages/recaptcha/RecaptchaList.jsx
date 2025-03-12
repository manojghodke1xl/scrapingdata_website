import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteRecaptchaApi, updateRecaptchaSitesApi, updateRecaptchaStatusApi } from '../../apis/recaptcha-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { recaptchaListNote } from './RecaptchaNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const RecaptchaList = () => {
  const { isDarkMode } = useColorContext();
  const [recaptchas, setRecaptchas] = useState([]);

  const rows = recaptchas.map((recaptcha) => {
    const { _id, version, sitekey, secretkey, isActive, sites, createdAt, updatedAt } = recaptcha;
    return {
      id: _id,
      exportData: recaptcha,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      version: version,
      sitekey: <TruncatableFieldToolTip content={sitekey} />,
      secretkey: <TruncatableFieldToolTip content={secretkey} />,
      status: (
        <div
          className={`rounded-xl ${
            isActive ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success` : `${isDarkMode ? 'border border-inactive' : 'bg-inactive'} text-inactive`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-green ' : 'bg-darkgray'}`} />
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 1, label: 'Version', key: 'version', dataKey: 'version' },
    { id: 2, label: 'site Key', key: 'sitekey', dataKey: 'sitekey' },
    { id: 3, label: 'Secret Key', key: 'secretkey', dataKey: 'secretkey' },
    { id: 4, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 5, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 6, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading="reCAPTCHA Settings" btn1="Add reCAPTCHA" href1="/recaptcha/add-recaptcha" icon1={<IoMdAdd />} btnLabel1="Add reCAPTCHA" />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'recaptcha'}
                headers={columnConfig}
                tableData={(data) => setRecaptchas(data.recaptchas)}
                rows={rows}
                apiUrl={'recaptcha'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/recaptcha/edit-recaptcha'}
                copyPath={'/recaptcha/duplicate-recaptcha'}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Status' },
                  { id: 2, name: 'Sites' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 1, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[
                  { id: 0, name: 'Version' },
                  { id: 1, name: 'SiteKey' },
                  { id: 2, name: 'SecretKey' }
                ]}
                modifyStatus={true}
                modifyStatusApi={updateRecaptchaStatusApi}
                modifySite={true}
                modifySiteApi={updateRecaptchaSitesApi}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteRecaptchaApi}
                deleteLabel={'Delete reCAPTCHA'}
                deleteMessage={'Are you sure you want to delete this reCAPTCHA?'}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={recaptchaListNote} />
    </div>
  );
};

export default RecaptchaList;
