import { lazy } from 'react';

//  Lazy load components for better performance
const ScrapingDataList = lazy(() => import('../../pages/Bayut/ScrapingDataList'));
const AddScrapingData = lazy(() => import('../../pages/bayut/AddScrapingData'));
const ViewScrapingData = lazy(() => import('../../pages/Bayut/ViewScrapingData'));
const ScrapingDataIntegration = lazy(() => import('../../pages/bayut/ScrapingDataIntegration'));

//  Define routes for Scraping Data module
const ScrapingDataRoutes = [
  // Route: List all scraped data
  { path: 'bayut/scraping_data-list', Component: ScrapingDataList },

  // Route: Add new scraping data entry
  { path: 'bayut/add-scraping_data', Component: AddScrapingData },

  // Route: View scraping data details by ID
  { path: 'bayut/view-scraping_data/:id', Component: ViewScrapingData },

  // Route: Manage scraping data integrations
  { path: 'bayut/scraping_data-integration', Component: ScrapingDataIntegration }
];

//  Export routes for use in main router
export default ScrapingDataRoutes;
