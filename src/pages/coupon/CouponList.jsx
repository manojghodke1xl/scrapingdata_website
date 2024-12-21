import { useContext, useEffect, useState } from "react";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import TruncatableField from "../../comps/modals/truncatableField";
import { formatDateTime } from "../../utils/function";
import ConfirmationModal from "../../comps/modals/confirmation";
import { deleteCouponApi } from "../../apis/coupon";

const CouponList = () => {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [coupons, setCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const searchAbleKeys = ["Code"];
  const filter = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout("coupons", page - 1, limit, searchTerm, searchKey, statusFilter);

  const handleCheckboxChange = (couponId) => {
    setSelectedCoupons((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(couponId)) updatedSelected = prevSelected.filter((id) => id !== couponId);
      else updatedSelected = [...prevSelected, couponId];

      if (updatedSelected.length !== coupons.length) setSelectAll(false);

      return updatedSelected;
    });
  };
  const handleSelectAll = () => {
    if (selectAll) setSelectedCoupons([]);
    else setSelectedCoupons(coupons.map((coupon) => coupon._id));
    setSelectAll(!selectAll);
  };

  const deleteSectedCoupon = async () => {
    if (!selectedCoupons.length) {
      alert({ type: "warning", text: "Please select at least one coupon to delete." });
      return;
    }
    setLoading(true);
    try {
      const { status, data } = await deleteCouponApi(selectedCoupons);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedCoupons([]);
        setSelectAll(false);
      } else alert({ type: "danger", text: data });
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedCoupons([]);
    }
  };

  useEffect(() => {
    if (data) {
      setCoupons(data.coupons);
      setTotalCount(data.count);
    } else if (err) alert({ type: "warning", text: err.message });
  }, [data, err, alert]);

  const headers = [
    {
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Coupon Code" },
    { label: "Discount Type" },
    { label: "Discount Value" },
    { label: "Minimum purchase Amount" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "status" },

    { label: "Actions" },
  ];

  const rows = coupons.map((category) => {
    const { _id, code, type, value, minAmount, isActive, createdAt, updatedAt } = category;
    return {
      _id,
      checkedbox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedCoupons.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      code: <TruncatableField title={"Coupon Code"} content={code} maxLength={50} />,
      type: type === "percentage" ? "Percentage" : "Amount",
      value: value,
      minAmount: minAmount,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),
      status:
        isActive === true ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
      actions: (
        <button key={_id} onClick={() => navigate(`/edit-coupon/${_id}`)} className="btn btn-primary me-1">
          Edit
        </button>
      ),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Coupon List</h3>
            <div className="card-options d-flex gap-2">
              <div className="card-options">
                <div className="text-secondary">
                  Filter
                  <div className="mx-2 d-inline-block">
                    <select className="form-select form-control-sm" onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="">All</option>
                      {filter.map((key, i) => (
                        <option key={i} value={key.toLowerCase()}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedCoupons.length > 0 && (
                  <button onClick={() => setModalOpen(true)} className="btn btn-danger mx-2">
                    Delete Selected
                  </button>
                )}
                <button onClick={() => navigate("/add-coupon")} className="btn btn-primary ">
                  Add Coupon
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
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={(newLimit) => setLimit(newLimit)}
              totalCount={totalCount}
            />
          </div>
        </div>
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={deleteSectedCoupon}
          message="Are you sure you want to delete this Coupon?"
        />
      </div>
      {/* <Addnote des={listCategoryNote} /> */}
    </div>
  );
};

export default CouponList;
