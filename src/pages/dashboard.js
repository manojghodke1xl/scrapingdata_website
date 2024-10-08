import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

export default function Dashboard() {
  const { auth } = useContext(GlobalContext);

  return (
    <div className="page-body">
      <div className="container-xl d-flex flex-column justify-content-center">
        <div className="card">
          <div className="card-body">
            <h2 className="h2 text-center">Welcome SMJV {auth.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
