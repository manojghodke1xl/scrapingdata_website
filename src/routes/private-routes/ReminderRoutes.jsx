import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ReminderList = lazy(() => import('../../pages/reminder/ReminderList'));
const AddReminder = lazy(() => import('../../pages/reminder/AddReminder'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const ReminderRoutes = () => {
  return (
    <Routes>
      <Route path="/reminder-list" element={<ReminderList />} />
      <Route path="/add-reminder" element={<AddReminder />} />
      <Route path="/edit-reminder/:id" element={<AddReminder />} />
      <Route path="/duplicate-reminder/:id" element={<AddReminder />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ReminderRoutes;
