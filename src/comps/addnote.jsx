const Addnote = ({ des }) => {
  return (
    <div className="container-xl mt-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-start gap-2 justify-content-start">
            <h3 className="mb-0">Note:</h3> <p className="mb-0">{des}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addnote;
