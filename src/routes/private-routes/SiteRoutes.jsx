import { lazy } from 'react';

// Lazy load the SiteList component to display a list of sites.
const SiteList = lazy(() => import('../../pages/site/SiteList'));
// Lazy load the AddSite component to add a new site.
const AddSite = lazy(() => import('../../pages/site/AddSite'));
// Lazy load the SiteNotificationSettings component to display site notification settings.
const SiteNotificationSettings = lazy(() => import('../../pages/site/SiteNotificationSettings'));

// Define the routes for the site feature.
const SiteRoutes = [
  // Route to display a list of sites.
  { path: 'site/site-list', Component: SiteList },
  // Route to add a new site.
  { path: 'site/add-site', Component: AddSite },
  // Route to edit an existing site.
  { path: 'site/edit-site/:id', Component: AddSite },
  // Route to display site notification settings.
  { path: 'site/site-settings', Component: SiteNotificationSettings }
];

// Export the SiteRoutes array as the default export.
export default SiteRoutes;
