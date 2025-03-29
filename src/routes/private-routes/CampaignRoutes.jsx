import AddCampaign from '../../pages/campaign/AddCampaign';
import CampaignList from '../../pages/campaign/CampaignList';

const CampaignRoutes = [
  // Route for listing all broadcasts
  { path: 'campaign/campaign-list', Component: CampaignList },
  // Route for adding a new broadcast
  { path: 'campaign/add-campaign', Component: AddCampaign },
  // Route for editing an existing broadcast
  { path: 'campaign/edit-campaign/:id', Component: AddCampaign },
  // Route for duplicating an existing broadcast
  { path: 'campaign/duplicate-campaign/:id', Component: AddCampaign }
];

// Export the BroadcastRoutes array as the default export
export default CampaignRoutes;
