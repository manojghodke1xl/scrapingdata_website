import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { deletePopupApi, duplicatePopupApi, updatePopupStatusApi } from '../../apis/popup-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listPopupNote } from './PopupNotes';
import { AiOutlineApi } from 'react-icons/ai';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const PopupList = () => {
  const [popups, setPopups] = useState([]);

  const rows = popups.map((popup) => {
    const { _id, name, showOnDeviceType, contentType, isActive, site, createdAt, updatedAt } = popup;
    return {
      id: _id,
      exportData: popup,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host}) `} maxLength={20} />,
      showOnDeviceType: showOnDeviceType === 'mobile' ? 'Mobile' : showOnDeviceType === 'desktop' ? 'Desktop' : 'All',
      contentType: contentType === 'guide' ? 'Guide' : contentType === 'casestudy' ? 'Case Study' : 'Basic',
      isActive: (
        <div className={`rounded-xl ${isActive ? 'bg-[#ECFDF3] text-[#027948]' : 'bg-[#F2F4F7] text-[#344054]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isActive ? 'bg-[#12B76A]' : 'bg-[#667085]'}`}></span>
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
        <TableHeader
          heading={'Pop-ups'}
          btn1={true}
          href1={'/pop-up/pop-up-integration'}
          icon1={<AiOutlineApi />}
          btnLabel1={'API Integration'}
          btn2={true}
          href2={'/pop-up/add-pop-up'}
          icon2={<IoMdAdd />}
          btnLabel2={'Add Pop-up'}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'popup'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
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
                copy={true}
                copyPath={'/pop-up/duplicate-pop-up'}
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
