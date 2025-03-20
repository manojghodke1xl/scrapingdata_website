import { lazy } from 'react';

// Lazy load the CaseStudyList component
const CaseStudyList = lazy(() => import('../../pages/caseStudy/CaseStudyList'));
// Lazy load the AddCaseStudy component
const AddCaseStudy = lazy(() => import('../../pages/caseStudy/AddCaseStudy'));
// Lazy load the CaseStudyIntegration component
const CaseStudyIntegration = lazy(() => import('../../pages/caseStudy/CaseStudyIntegration'));

// Define routes for case studies
const CaseStudyRoutes = [
  // Route for the list of case studies
  { path: 'case-study/case-study-list', Component: CaseStudyList },
  // Route for adding a new case study
  { path: 'case-study/add-case-study', Component: AddCaseStudy },
  // Route for editing an existing case study by ID
  { path: 'case-study/edit-case-study/:id', Component: AddCaseStudy },
  // Route for case study integrations
  { path: 'case-study/case-study-integration', Component: CaseStudyIntegration },
  // Route for duplicating an existing case study by ID
  { path: 'case-study/duplicate-case-study/:id', Component: AddCaseStudy }
];

export default CaseStudyRoutes;

