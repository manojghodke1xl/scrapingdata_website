  import StatsList from '../../atoms/dashboard/StatsList';
  import useLayout from '../../hooks/useLayout';
  import { dashBoardStats } from './dashboardData';

  const Dashboard = () => {
    const { layoutSize } = useLayout();

    return (
      <div className={`${layoutSize === 'small' ? 'p-1' : layoutSize === 'large' ? 'p-8' : 'p-4'}`}>
        <div
          className={`w-full flex md:flex-wrap sm:flex-nowrap justify-between border-b border-primary ${
            layoutSize === 'small' ? 'pb-1 text-xl' : layoutSize === 'large' ? 'pb-5 text-3xl' : 'pb-2 text-2xl'
          }`}
        >
          <h4 className="text-dark">Dashboard</h4>
        </div>
        <div className={`grid sm:grid-cols-2 xl:grid-cols-4 w-full ${layoutSize === 'small' ? 'gap-1 py-1' : layoutSize === 'large' ? 'gap-6 py-4' : 'gap-3 py-2'}`}>
          <StatsList list={dashBoardStats} />
        </div>
      </div>
    );
  };

  export default Dashboard;
