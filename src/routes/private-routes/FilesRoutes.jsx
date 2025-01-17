import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FilesList = lazy(() => import('../../pages/files/FilesList'));
const AddFiles = lazy(() => import('../../pages/files/AddFiles'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const FilesRoutes = () => {
  return (
    <Routes>
      <Route path="/file-list" element={<FilesList />} />
      <Route path="/add-file" element={<AddFiles />} />
      <Route path="/edit-file/:id" element={<AddFiles />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default FilesRoutes;
