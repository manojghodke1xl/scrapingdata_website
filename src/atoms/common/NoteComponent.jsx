const NoteComponent = ({ note }) => {
  return (
    <div className="border p-4 rounded-xl border-primary flex flex-col gap-2 mt-5">
      <div className="font-semibold flex items-center justify-start text-primary">Note: {note}</div>
    </div>
  );
};

export default NoteComponent;
