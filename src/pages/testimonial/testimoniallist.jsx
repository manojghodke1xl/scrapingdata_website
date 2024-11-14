import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Table from '../../comps/table';
import ConfirmationModal from '../../comps/confirmation';
import useSetTimeout from '../../Hooks/useDebounce';
import useGetAllSites from '../../Hooks/useGetAllSites';
import DuplicateModal from '../../comps/duplicate';
import {
  deleteTestimonialApi,
  updateTestimonialSitesApi,
  updateTestimonialStatusApi,
} from '../../apis/testimonial-apis';
import Addnote from '../../comps/addnote';
import { listTestimonialNote } from '../notes/notes-message';

export default function TestimonialList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [testimonials, setTestimonials] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [siteId, setSiteId] = useState('');
  const [statusSelect, setStatusSelect] = useState('');

  const allsites = useGetAllSites();

  const searchAbleKeys = ['Name'];

  const filter = ['Active', 'Inactive'];
  const Status = ['Active', 'Inactive'];

  const [err, data, setRefresh] = useSetTimeout(
    'testimonials',
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter,
    siteId
  );

  useEffect(() => {
    if (data) {
      setTestimonials(data.testimonials);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: 'warning', text: err.message });
    }
  }, [data, err, alert]);

  const updateTestimonialStatus = async (testimonialStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateTestimonialStatusApi(selectedTestimonials, testimonialStatus);

      if (status) {
        alert({ type: 'success', text: data.message });
        setRefresh((r) => !r);
        setSelectedTestimonials([]);
        setStatusSelect('');
        setSelectAll(false);
      } else {
        alert({ type: 'danger', title: 'Error!', text: data });
      }
    } catch (error) {
      alert({ type: 'danger', title: 'Error!', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonialSites = async (selectedSites, selectedAction) => {
    setLoading(true);
    try {
      const action = selectedAction === 'Add' ? true : false;
      const { status, data } = await updateTestimonialSitesApi(selectedTestimonials, selectedSites, action);
      if (status) {
        alert({ type: 'success', text: data.message });
        setRefresh((r) => !r);
        setSelectedTestimonials([]);
        setSelectAll(false);
      } else {
        alert({ type: 'danger', text: data });
      }
    } catch (error) {
      alert({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedTestimonials([]);
    }
  };

  const deleteSelectedTestimonial = async () => {
    if (!selectedTestimonials.length) {
      alert({ type: 'warning', text: 'Please select at least one testimonial to delete.' });
      return;
    }
    setLoading(true);
    try {
      const { status, data } = await deleteTestimonialApi(selectedTestimonials);

      if (status) {
        alert({ type: 'success', text: data.message });
        setRefresh((r) => !r);
      } else {
        alert({ type: 'danger', title: 'Error!', text: data });
      }
    } catch (error) {
      alert({ type: 'danger', title: 'Error!', text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedTestimonials([]);
      setStatusSelect('');
    }
  };

  const handleCheckboxChange = (testimonialId) => {
    setSelectedTestimonials((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(testimonialId)) {
        updatedSelected = prevSelected.filter((id) => id !== testimonialId);
        setStatusSelect('');
      } else {
        updatedSelected = [...prevSelected, testimonialId];
      }
      if (updatedSelected.length === testimonials.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(testimonials.map((testimonial) => testimonial._id));
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: (
        <input
          className="form-check-input "
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { label: 'Name' },
    { label: 'Status' },
    { label: 'Actions' },
    { label: 'Sites' },
  ];

  const rows = testimonials.map((testimonial) => {
    const { _id, name, isActive, sites } = testimonial;
    return {
      _id,
      checkedbox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedTestimonials.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      name,
      status: isActive ? (
        <span className="badge bg-success">Active</span>
      ) : (
        <span className="badge bg-danger">Inactive</span>
      ),
      actions: (
        <button
          key={_id}
          onClick={() => navigate(`/edit-testimonial/${_id}`)}
          className="btn btn-primary me-1">
          Edit
        </button>
      ),
      sites: sites.map((s) => `${s.name} (${s.host})`).join(', '),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Testimonials List</h3>
            <div className="card-options d-flex gap-2">
              <div className="card-options">
                <div className="text-secondary">
                  Filter
                  <div className="mx-2 d-inline-block">
                    <select
                      className="form-select form-control-sm"
                      onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="">All</option>
                      {filter.map((key, i) => (
                        <option
                          key={i}
                          value={key.toLowerCase()}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedTestimonials.length ? (
                  <>
                    <div className="text-secondary">
                      Status
                      <div className="mx-2 d-inline-block">
                        <select
                          className="form-select form-control-sm"
                          onChange={(e) => setStatusSelect(e.target.value)}>
                          <option value="">Select</option>
                          {Status.map((key, i) => (
                            <option
                              key={i}
                              value={key.toLowerCase()}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {statusSelect === 'active' && (
                      <button
                        onClick={() => updateTestimonialStatus(true)}
                        className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === 'inactive' && (
                      <button
                        onClick={() => updateTestimonialStatus(false)}
                        className="btn btn-danger mx-2">
                        Apply
                      </button>
                    )}
                    <button
                      onClick={() => setSiteModal(true)}
                      className="btn btn-primary mx-2">
                      Sites
                    </button>
                  </>
                ) : null}
                <button
                  onClick={() => navigate('/add-testimonial')}
                  className="btn btn-primary">
                  Add Testimonial
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(totalCount / limit)}
              onPageChange={setPage}
              entriesPerPage={limit}
              setSearchTerm={setSearchTerm}
              setSearchKey={setSearchKey}
              allsites={allsites}
              setSiteId={setSiteId}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={(newLimit) => {
                setLimit(newLimit);
              }}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteSelectedTestimonial}
        message="Are you sure you want to delete this Testimonial?"
      />
      <DuplicateModal
        allsites={allsites}
        isOpen={siteModal}
        onClose={setSiteModal}
        onConfirm={updateTestimonialSites}
        title="Update Sites"
        action={['Add', 'Remove']}
        confirmText="Update"
      />

      <Addnote des={listTestimonialNote} />
    </div>
  );
}
