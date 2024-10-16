import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";

export default function MailingList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [mailingToDelete, setMailingToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["email"];

  const [err, data] = useSetTimeout(
    "lists",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  useEffect(() => {
    if (data) {
      setLists(data.lists);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  

  const deleteMailingList = async () => {
    if (!selectedLists.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one List to delete.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/list`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedLists }),
      });

      const { error } = await res.json();

      if (res.ok) {
        setLists((prevList) =>
          prevList.filter((enq) => !selectedLists.includes(enq._id))
        );
        alert({
          type: "success",
          title: "Deleted!",
          text: `Selected List have been deleted.`,
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedLists([]);
    }
  };

  const handleCheckboxChange = (listId) => {
    setSelectedLists((prevSelected) => {
      if (prevSelected.includes(listId)) {
        return prevSelected.filter((id) => id !== listId);
      } else {
        return [...prevSelected, listId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLists([]);
    } else {
      setSelectedLists(lists.map((lst) => lst._id));
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: (
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
      ),
    },
    { label: "Customer Email" },
    { label: "Site Name" },
    { label: "Actions" },
  ];

  const rows = lists.map((lst) => [
    <input
      type="checkbox"
      checked={selectedLists.includes(lst._id)}
      onChange={() => handleCheckboxChange(lst._id)}
    />,
    lst.email,
    lst.site.name,
    <div key={lst._id}>
      <button
        onClick={() => navigate(`/mailing/${lst._id}`)}
        className="btn btn-primary me-1" 
      >
        View
      </button>
    </div>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Mailing Lists</h3>
            <div className="card-options">
              {selectedLists.length ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-danger"
                >
                  Delete Selected
                </button>
              ) : (
                ""
              )}
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
        onConfirm={deleteMailingList}
        message="Are you sure you want to delete this mailing list? "
      />
    </div>
  );
}
