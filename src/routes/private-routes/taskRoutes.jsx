import { lazy } from 'react';

// Lazy load the TaskList component
const TaskList = lazy(() => import('../../pages/task/TaskList'));

// Define the routes for the task feature
const TaskRoutes = [
  {
    // Route to display the list of tasks
    path: 'task/task-list',
    // Component to render for this route
    Component: TaskList
  }
];

// Export the TaskRoutes array as the default export
export default TaskRoutes;

