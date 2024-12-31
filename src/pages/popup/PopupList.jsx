import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { deletePopupApi, duplicatePopupApi, updatePopupStatusApi } from '../../apis/popup-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listPopupNote } from './PopupNotes';
import { AiOutlineApi } from 'react-icons/ai';

const PopupList = () => {
  const [popups, setPopups] = useState([]);

  const rows = popups.map((popup) => {
    const { _id, name, showOnDeviceType, contentType, isActive, site, createdAt, updatedAt } = popup;
    return {
      id: _id,
      exportData: popup,
      name: <TruncatableFieldModal title={'Name'} content={name} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host}) `} maxLength={20} />,
      showOnDeviceType: showOnDeviceType === 'mobile' ? 'Mobile' : showOnDeviceType === 'desktop' ? 'Desktop' : 'All',
      contentType: contentType === 'guide' ? 'Guide' : contentType === 'casestudy' ? 'Case Study' : 'Basic',
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
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Pop-up List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit gap-2">
            <Link to="/pop-up/add-pop-up" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 border border-primary text-primary">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Pop-up</span>
            </Link>
            <Link to="/pop-up/pop-up-integration" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <AiOutlineApi size={22} />
              <span className="hidden md:block">Api Integration</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Device Type', key: 'showOnDeviceType' },
                  { label: 'Type', key: 'contentType' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setPopups(data.popups)}
                rows={rows}
                apiUrl={'popups'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/pop-up/edit-pop-up'}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[{ id: 1, name: 'Name' }]}
                deleteBtn={true}
                deleteApi={deletePopupApi}
                deleteLabel={'Delete Pop-up'}
                deleteMessage={'Are you sure you want to delete this pop-up?'}
                modifyStatus={true}
                modifyStatusApi={updatePopupStatusApi}
                duplicateBtn={true}
                duplicateApi={duplicatePopupApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={listPopupNote} />
    </div>
  );
};

export default PopupList;
