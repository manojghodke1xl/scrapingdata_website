import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SegmentList = lazy(() => import('../../pages/segment/SegmentList'));
const AddSegment = lazy(() => import('../../pages/segment/AddSegment'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const SegmentRoutes = () => {
  return (
    <Routes>
      <Route path="/segment-list" element={<SegmentList />} />
      <Route path="/add-segment" element={<AddSegment />} />
      <Route path="/edit-segment/:id" element={<AddSegment />} />
      <Route path="/duplicate-segment/:id" element={<AddSegment />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default SegmentRoutes;
