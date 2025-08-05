import { lazy } from 'react';

// Lazy load the ProjectCheckerList component
const ProjectCheckerList = lazy(() => import('../../pages/projectChecker/ProjectCheckerList'));

// Lazy load the ProjectCheckerDetails component
const UsageGuide = lazy(() => import('../../pages/projectChecker/UsageGuide'));

// Define routes for product-related pages
const ProjectCheckerRoutes = [
  // Route to display the list of products
  { path: 'projectChecker/project-checker-list', Component: ProjectCheckerList },
  { path: 'projectChecker/project-checker-doc', Component: UsageGuide }
];

// Export the ProjectCheckerRoutes array as the default export
export default ProjectCheckerRoutes;
