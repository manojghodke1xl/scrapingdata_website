import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteGalleryApi, updateGallerySitesApi, updateGalleryStatusApi } from '../../apis/gallery-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { galleryListNote } from './GalleryNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const GalleryList = () => {
  const { isDarkMode } = useColorContext();
  const [galleries, setGalleries] = useState([]);

  const rows = galleries.map((gallery) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = gallery;

    return {
      id: _id,
      exportData: gallery,
      image: <img src={image.url} alt="Company Logo" className="w-8 h-8 rounded" />,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
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
    { id: 0, label: 'Image', key: 'image', dataKey: 'image', formatForExport: (value) => (value ? value.url : '') },
    { id: 1, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 2, label: 'Status', key: 'status', dataKey: 'isActive', formatForExport: (value) => (value ? 'Active' : 'Inactive') },
    { id: 3, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 4, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Gallery'} btn1={true} href1={'/gallery/add-gallery'} icon1={<IoMdAdd />} btnLabel1={'Add Gallery'} />
      <TableComponent
        selectable={true}
        search={true}
        siteModule={'gallery'}
        headers={columnConfig}
        tableData={(data) => setGalleries(data.galleries)}
        rows={rows}
        apiUrl={'gallery'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/gallery/edit-gallery'}
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
        deleteAction={true}
        deleteApi={deleteGalleryApi}
        deleteLabel={'Delete Gallery'}
        deleteMessage={'Are you sure you want to delete this Gallery?'}
      />
      <NoteComponent note={galleryListNote} />
    </div>
  );
};

export default GalleryList;
