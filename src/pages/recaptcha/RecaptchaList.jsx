import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteRecaptchaApi, updateRecaptchaSitesApi, updateRecaptchaStatusApi } from '../../apis/recaptcha-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { recaptchaListNote } from './RecaptchaNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const RecaptchaList = () => {
  const [recaptchas, setRecaptchas] = useState([]);

  const rows = recaptchas.map((recaptcha) => {
    const { _id, version, sitekey, secretkey, isActive, sites, createdAt, updatedAt } = recaptcha;
    return {
      id: _id,
      exportData: recaptcha,
      sites: <TruncatableFieldToolTip title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      version: version,
      sitekey: <TruncatableFieldToolTip title={'Title'} content={sitekey} />,
      secretkey: <TruncatableFieldToolTip title={'Title'} content={secretkey} />,
      isActive: (
        <div className={`rounded-xl ${isActive ? 'bg-[#ECFDF3] text-[#027948]' : 'bg-[#F2F4F7] text-[#344054]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

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
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Version', key: 'version' },
                  { label: 'site Key', key: 'sitekey' },
                  { label: 'Secret Key', key: 'secretkey' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setRecaptchas(data.recaptchas)}
                rows={rows}
                apiUrl={'recaptcha'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/recaptcha/edit-recaptcha'}
                copy={true}
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
