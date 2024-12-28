import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const CaseStudyList = lazy(() => import('../../pages/caseStudy/CaseStudyList'));
const AddCaseStudy = lazy(() => import('../../pages/caseStudy/AddCaseStudy'));
const CaseStudyIntegration = lazy(() => import('../../pages/caseStudy/CaseStudyIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const CaseStudyRoutes = () => {
  return (
    <Routes>
      <Route path="/case-study-list" element={<CaseStudyList />} />
      <Route path="/add-case-study" element={<AddCaseStudy />} />
      <Route path="/edit-case-study/:id" element={<AddCaseStudy />} />
      <Route path="/case-study-integration" element={<CaseStudyIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default CaseStudyRoutes;
