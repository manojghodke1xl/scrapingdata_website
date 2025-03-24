import useLayout from '../../hooks/useLayout';

const StatsList = ({ list }) => {
  const { layoutSize } = useLayout();

  return list.map(({ field, stats }, index) => (
    <div
      key={field + index}
      className={`border rounded-xl border-primary flex flex-col text-nowrap font-normal 
      ${layoutSize === 'small' ? 'p-1 gap-1' : layoutSize === 'large' ? 'p-4 gap-2' : 'p-2 gap-2'}
    `}
    >
      <div className={`${layoutSize === 'small' ? 'text-sm' : layoutSize === 'large' ? 'text-xl' : 'text-base'}`}>{field}</div>
      <div className={`${layoutSize === 'small' ? 'text-xl' : layoutSize === 'large' ? 'text-3xl' : 'text-2xl'}`}>{stats}</div>
    </div>
  ));
};

export default StatsList;
