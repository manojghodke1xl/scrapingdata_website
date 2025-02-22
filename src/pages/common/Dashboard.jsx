import StatsList from '../../atoms/dashboard/StatsList';
import { dashBoardStats } from './dashboardData';

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
        <div className="">
          <h4 className="text-3xl text-dark">Dashboard</h4>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-4 w-full">
        <StatsList list={dashBoardStats} />
      </div>
    </div>
  );
};

export default Dashboard;
