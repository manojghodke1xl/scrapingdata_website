const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
        <div className="">
          <h4 className="text-3xl text-dark">Dashboard</h4>
        </div>
      </div>
      <div className=" gap-6 ptpb-4">
        <div className="border p-4 rounded-xl border-primary flex flex-col gap-2">
          <div className="text-3xl font-semibold flex items-center justify-center">Welcome to MarsCMS&apos;s Enquiry Management System</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
