import { lazy } from 'react';

// Lazy load the SegmentList component to display a list of segments
const SegmentList = lazy(() => import('../../pages/segment/SegmentList'));
// Lazy load the AddSegment component to add a new segment
const AddSegment = lazy(() => import('../../pages/segment/AddSegment'));

// Define the routes for segment-related pages
const SegmentRoutes = [
  // Route to display a list of segments
  { path: 'segments/segment-list', Component: SegmentList },
  // Route to add a new segment
  { path: 'segments/add-segment', Component: AddSegment },
  // Route to edit an existing segment by ID
  { path: 'segments/edit-segment/:id', Component: AddSegment },
  // Route to duplicate an existing segment by ID
  { path: 'segments/duplicate-segment/:id', Component: AddSegment }
];

// Export the SegmentRoutes array as the default export
export default SegmentRoutes;
