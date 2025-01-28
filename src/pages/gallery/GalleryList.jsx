import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteGalleryApi, updateGallerySitesApi, updateGalleryStatusApi } from '../../apis/gallery-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { galleryListNote } from './GalleryNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  const rows = galleries.map((gallery) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = gallery;

    return {
      id: _id,
      exportData: gallery,
      image: <img src={image.url} alt="Company Logo" className="w-8 h-8 rounded" />,
      sites: <TruncatableFieldToolTip title={'Sites'} content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
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
        <TableHeader heading={'Gallery'} btn1={true} href1={'/gallery/add-gallery'} icon1={<IoMdAdd size={22} />} btnLabel1={'Add Gallery'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                search={true}
                siteModule={'gallery'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Image', key: 'image' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'isActive' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setGalleries(data.galleries)}
                rows={rows}
                apiUrl={'gallery'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/gallery/edit-gallery'}
                copy={true}
                copyPath={'/gallery/duplicate-gallery'}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                modifyStatus={true}
                modifyStatusApi={updateGalleryStatusApi}
                modifySite={true}
                modifySiteApi={updateGallerySitesApi}
                deleteBtn={true}
                deleteApi={deleteGalleryApi}
                deleteLabel={'Delete Gallery'}
                deleteMessage={'Are you sure you want to delete this Gallery?'}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={galleryListNote} />
    </div>
  );
};

export default GalleryList;
