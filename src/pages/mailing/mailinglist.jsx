import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Table from '../../comps/table';
import ConfirmationModal from '../../comps/confirmation';
import useSetTimeout from '../../Hooks/useDebounce';
import useGetAllSites from '../../Hooks/useGetAllSites';
import { deleteMailingListApi } from '../../apis/mailing-apis';

export default function MailingList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [siteId, setSiteId] = useState('');
  const allsites = useGetAllSites();

  const searchAbleKeys = ['Email'];

  const [err, data, setRefresh] = useSetTimeout(
    'lists',
    page - 1,
    limit,
    searchTerm,
    searchKey,
    '',
    siteId
  );

  useEffect(() => {
    if (data) {
      setLists(data.lists);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: 'warning', text: err.message });
    }
  }, [data, err, alert]);

  const deleteMailingList = async () => {
    if (!selectedLists.length)
      return alert({
        type: 'warning',
        text: 'Please select at least one List to delete.',
      });

    setLoading(true);
    try {
      const { status, data } = await deleteMailingListApi(selectedLists);
      if (status) {
        setLists((prevList) =>
          prevList.filter((enq) => !selectedLists.includes(enq._id))
        );
        alert({ type: 'success', text: data.message });
        setRefresh((r) => !r);
        setSelectedLists([]);
        setSelectAll(false);
      } else {
        alert({ type: 'danger', text: data });
      }
    } catch (error) {
      alert({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedLists([]);
    }
  };

  const handleCheckboxChange = (listId) => {
    setSelectedLists((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(listId)) {
        updatedSelected = prevSelected.filter((id) => id !== listId);
      } else {
        updatedSelected = [...prevSelected, listId];
      }

      if (updatedSelected.length === lists.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }

      return updatedSelected;
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
        <input
          className="form-check-input"
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { label: 'Customer Email' },
    { label: 'Site' },
    { label: 'Created Date' },
    { label: 'Updated Date' },
    { label: 'Actions' },
  ];

  const rows = lists.map(
    (lst) => {
      const { _id, email, site, createdAt, updatedAt } = lst;
      return {
        _id,
        checkedbox: (
          <input
            key={lst._id}
            className="form-check-input"
            type="checkbox"
            checked={selectedLists.includes(lst._id)}
            onChange={() => handleCheckboxChange(lst._id)}
          />
        ),
        email,
        siteName: `${site.name} (${site.host}) `,
       
        created: new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        udpated: new Date(updatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        action: (
          <div key={lst._id}>
            <button
              onClick={() => navigate(`/mailing/${lst._id}`)}
              className="btn btn-primary me-1">
              View
            </button>
          </div>
        ),
      };
    }
    //   [
    //   <input
    //     key={lst._id}
    //     className="form-check-input"
    //     type="checkbox"
    //     checked={selectedLists.includes(lst._id)}
    //     onChange={() => handleCheckboxChange(lst._id)}
    //   />,
    //   lst.email,
    //   lst.site.name,
    //   <div key={lst._id}>
    //     <button onClick={() => navigate(`/mailing/${lst._id}`)} className="btn btn-primary me-1">
    //       View
    //     </button>
    //   </div>,
    // ]
  );

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
                  className="btn btn-danger">
                  Delete Selected
                </button>
              ) : (
                ''
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
              allsites={allsites}
              setSiteId={setSiteId}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={setLimit}
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
