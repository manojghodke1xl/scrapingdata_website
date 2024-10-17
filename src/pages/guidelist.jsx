import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import useSetTimeout from "../Hooks/useDebounce";
import useGetAllSites from "../Hooks/useGetAllSites";

export default function GuideList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [guides, setGuides] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedGuides, setSelectedGuides] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [siteId, setSiteId] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Title"];
  const filter = ["All", "Active", "Inactive"];

  const [err, data] = useSetTimeout(
    "guides",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter,
    siteId
  );

  useEffect(() => {
    if (data) {
      setGuides(data.guides);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const updateSelectedGuidesStatus = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/guide-status`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("auth"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedGuides, isActive: status }),
        }
      );

      const { error } = await res.json();

      if (res.ok) {
        setGuides((prevCaseStudies) =>
          prevCaseStudies.map((guide) =>
            selectedGuides.includes(guide._id)
              ? { ...guide, isActive: status }
              : guide
          )
        );
        alert({
          type: "success",
          title: "Updated!",
          text: `Selected case studies have been marked as ${
            status ? "Active" : "Inactive"
          }.`,
        });

        setSelectedGuides([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
    }
  };


  const handleCheckboxChange = (guideId) => {
    setSelectedGuides((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(guideId)) {
        updatedSelected = prevSelected.filter((id) => id !== guideId);
      } else {
        updatedSelected = [...prevSelected, guideId];
      }
      if (updatedSelected.length === guides.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }

      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGuides([]);
    } else {
      setSelectedGuides(guides.map((guide) => guide._id));
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
    { label: "Title" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = guides.map((guide) => [
    <input
      key={guide._id}
      className="form-check-input"
      type="checkbox"
      checked={selectedGuides.includes(guide._id)}
      onChange={() => handleCheckboxChange(guide._id)}
    />,
    guide.title,
    guide.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div key={guide._id}>
      <button
        onClick={() => navigate(`/edit-guide/${guide._id}`)}
        className="btn btn-primary me-1"
      >
        Edit
      </button>
    </div>,
    guide.sites.map((s) => `${s.name} (${s.host})`).join(", "),
  ]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Guides List</h3>
            <div className="card-options d-flex gap-2">
              <div className="card-options">
                <div className="text-secondary">
                  Filter
                  <div className="mx-2 d-inline-block">
                    <select
                      className="form-select form-control-sm"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      {filter.map((key, i) => (
                        <option key={i} value={key.toLowerCase()}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedGuides.length ? (
                  <>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => updateSelectedGuidesStatus(true)}
                    >
                      All Active
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => updateSelectedGuidesStatus(false)} 
                    >
                      All Inactive
                    </button>
                  </>
                ) : null}
                <button
                  onClick={() => navigate("/add-guide")}
                  className="btn btn-primary"
                >
                  Add Guide
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(guides.length / limit)}
              onPageChange={handlePageChange}
              entriesPerPage={limit}
              setSearchTerm={setSearchTerm}
              setSearchKey={setSearchKey}
              allsites={allsites}
              setSiteId={setSiteId}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={handleLimitChange}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
