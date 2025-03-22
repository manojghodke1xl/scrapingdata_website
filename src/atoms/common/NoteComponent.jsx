import useLayout from '../../hooks/useLayout';

const NoteComponent = ({ note }) => {
  const { layoutSize } = useLayout();
  return (
    <div
      className={`border rounded-xl border-primary flex flex-col gap-2 mt-2 ${layoutSize === 'small' ? 'text-sm p-2 mt-2' : layoutSize === 'large' ? 'text-base p-4 mt-4' : 'text-base p-3'}`}
    >
      <div className="font-semibold  flex items-center justify-start text-primary">Note: {note}</div>
    </div>
  );
};

export default NoteComponent;
