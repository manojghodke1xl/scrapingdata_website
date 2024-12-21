import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { addCouponApi, getCouponByIdApi, updateCouponApi } from "../../apis/coupon";

const AddCoupon = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [couponDetails, setCouponDetails] = useState({
    code: "",
    info: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    type: "",
    upto: "",
    value: "",
    isActive: true,
    isGlobal: false,
    useOnce: false,
    firstSub: false,
  });
  const [errors, setErrors] = useState({});
  const couponType = ["Percentage", "Amount"];

  const validate = () => {
    const newErrors = {};
    if (!couponDetails.code.trim()) newErrors.code = "Coupon Code is required";
    if (!couponDetails.info.trim) newErrors.info = "Description is required";
    if (!couponDetails.startDate) newErrors.startDate = "Start Date is required";
    if (!couponDetails.endDate) newErrors.endDate = "End Date is required";
    if (!couponDetails.type) newErrors.type = "Coupon Type is required";
    if (!couponDetails.value) newErrors.value = "Discount value is required";
    if (!couponDetails.upto) newErrors.upto = "Discount Upto is required for percentage discounts";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getCouponByIdApi(id);
          if (status) setCouponDetails(data.coupon);
          else alert({ type: "warning", text: "Coupon not found" });
        } catch (error) {
          alert({ type: "danger", text: error.message });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, alert, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateCouponApi(id, couponDetails) : addCouponApi(couponDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/coupon-list");
      } else alert({ type: "warning", text: data });
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Coupon" : "Add Coupon"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label required">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  placeholder="Coupon code"
                  value={couponDetails.code}
                  onChange={(e) => {
                    setCouponDetails((prev) => ({ ...prev, code: e.target.value }));
                    if (errors.code) setErrors((prev) => ({ ...prev, code: "" }));
                  }}
                />
                {errors.code && <div className="invalid-feedback mt-2">{errors.code}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label required">Coupon Description</label>
                <textarea
                  name="info"
                  rows={3}
                  className={`form-control ${errors.info ? "is-invalid" : ""}`}
                  placeholder="Coupon Description"
                  value={couponDetails.info}
                  onChange={(e) => {
                    setCouponDetails((prev) => ({ ...prev, info: e.target.value }));
                    if (errors.info) setErrors((prev) => ({ ...prev, info: "" }));
                  }}
                />
                {errors.info && <div className="invalid-feedback mt-2">{errors.info}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  name="archiveDate"
                  className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                  placeholder="Start Date"
                  value={couponDetails.startDate}
                  onChange={(e) => {
                    setCouponDetails((d) => ({ ...d, startDate: e.target.value }));
                    if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: "" }));
                  }}
                />
                {errors.startDate && <div className="invalid-feedback mt-2">{errors.startDate}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="datetime-local"
                  name="archiveDate"
                  className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                  placeholder="End Date"
                  value={couponDetails.endDate}
                  onChange={(e) => {
                    setCouponDetails((d) => ({ ...d, endDate: e.target.value }));
                    if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: "" }));
                  }}
                />
                {errors.endDate && <div className="invalid-feedback mt-2">{errors.endDate}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label"> Minimum Amount</label>
                <input
                  type="number"
                  name="minAmount"
                  className={`form-control`}
                  placeholder="Minimum Amount"
                  value={couponDetails.minAmount}
                  onChange={(e) => setCouponDetails((prev) => ({ ...prev, minAmount: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label required">Coupon Type</label>
                <select
                  className={`form-control ${errors.type ? "is-invalid" : ""}`}
                  value={couponDetails.type}
                  onChange={(e) => {
                    setCouponDetails((prev) => ({ ...prev, type: e.target.value }));
                    if (errors.type) setErrors((prev) => ({ ...prev, type: "" }));
                  }}
                >
                  <option value="">Select Type</option>
                  {couponType.map((couponType, index) => (
                    <option key={index} value={couponType.toLowerCase()}>
                      {couponType}
                    </option>
                  ))}
                </select>
                {errors.type && <div className="invalid-feedback mt-2">{errors.type}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Discount Upto</label>
                <input
                  type="number"
                  name="upto"
                  className={`form-control ${errors.upto ? "is-invalid" : ""}`}
                  placeholder="Discount Upto"
                  value={couponDetails.upto}
                  onChange={(e) => {
                    setCouponDetails((prev) => ({ ...prev, upto: e.target.value }));
                    if (errors.upto) setErrors((prev) => ({ ...prev, upto: "" }));
                  }}
                />
                {errors.upto && <div className="invalid-feedback">{errors.upto}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label required">Discount Value</label>
                <input
                  type="number"
                  name="value"
                  className={`form-control ${errors.value ? "is-invalid" : ""}`}
                  placeholder="Coupon Value"
                  value={couponDetails.value}
                  onChange={(e) => {
                    setCouponDetails((prev) => ({ ...prev, value: e.target.value }));
                    if (errors.value) setErrors((prev) => ({ ...prev, value: "" }));
                  }}
                />
                {errors.value && <div className="invalid-feedback mt-2">{errors.value}</div>}
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col form-label">Is Coupon active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={couponDetails.isActive}
                        onChange={() =>
                          setCouponDetails((prev) => ({
                            ...prev,
                            isActive: !prev.isActive,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col form-label">New User</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={couponDetails.firstSub}
                        onChange={() =>
                          setCouponDetails((prev) => ({
                            ...prev,
                            firstSub: !prev.firstSub,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col form-label">User Once</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={couponDetails.useOnce}
                        onChange={() =>
                          setCouponDetails((prev) => ({
                            ...prev,
                            useOnce: !prev.useOnce,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col form-label">Is Coupon Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={couponDetails.isGlobal}
                        onChange={() =>
                          setCouponDetails((prev) => ({
                            ...prev,
                            isGlobal: !prev.isGlobal,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
