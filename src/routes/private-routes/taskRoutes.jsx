import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const TaskList = lazy(() => import('../../pages/task/TaskList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const TaskRoutes = () => {
  return (
    <Routes>
      <Route path="/task-list" element={<TaskList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default TaskRoutes;
