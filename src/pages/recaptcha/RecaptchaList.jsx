import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteRecaptchaApi, updateRecaptchaSitesApi, updateRecaptchaStatusApi } from '../../apis/recaptcha-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { recaptchaListNote } from './RecaptchaNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

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
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All reCAPTCHA List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/recaptcha/add-recaptcha" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add reCAPTCHA</span>
            </Link>
          </div>
        </div>
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
