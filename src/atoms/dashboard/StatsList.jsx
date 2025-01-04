const StatsList = ({ list }) => {
  return list.map(({ field, stats }, index) => (
    <div key={field + index} className="border p-4 rounded-xl border-primary flex flex-col gap-2 text-nowrap">
      <div className="text-sm font-normal">{field}</div>
      <div className="text-3xl font-normal">{stats}</div>
    </div>
  ));
};

export default StatsList;
