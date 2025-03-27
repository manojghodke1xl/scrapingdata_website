import useLayout from '../../hooks/useLayout';

/**
 * NoteComponent - A responsive component to display notes with different layouts
 * @param {Object} props - Component properties
 * @param {string} props.note - The note text to be displayed
 * @returns {JSX.Element} A styled note container
 */
const NoteComponent = ({ note }) => {
  // Get current layout size from layout hook
  const { layoutSize } = useLayout();

  // Define padding classes based on layout size
  const containerPadding = layoutSize === 'small' ? 'p-1' : layoutSize === 'large' ? 'px-8 py-4' : 'px-4 py-2';

  // Define content styling based on layout size
  const contentStyle = layoutSize === 'small' ? 'text-sm p-2 mt-2' : layoutSize === 'large' ? 'text-base p-4 mt-4' : 'text-base p-3';

  return (
    <div className={containerPadding}>
      <div className={`border rounded-xl border-primary flex flex-col ${contentStyle}`}>
        <div className="font-semibold flex items-center justify-start text-primary">Note: {note}</div>
      </div>
    </div>
  );
};

export default NoteComponent;
