import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddSmtp() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [errors, setErrors] = useState({});

  const [detail, setDetail] = useState({
    name: "",
    host: "",
    port: "",
    secure: "",
    user: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/smtp/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();

        if (res.ok) {
          const { name, host, port, secure, user } = data.smtp; // Get isGlobal from response
          setDetail({ name, host, port, secure, user });
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) =>
          alert({ type: "danger", title: "Error !", text: error.message })
        )
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!detail.name) newErrors.name = "Name is required";
    if (!detail.host) newErrors.host = "Host is required";
    if (!detail.secure.includes("none")) newErrors.secure = "Security Protocol is required";
    if (!detail.port) newErrors.port = "Port is required";
    if (!detail.user) newErrors.user = "User is required";
    if (!detail.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/smtp${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("auth"),
          },
          body: JSON.stringify(detail),
        }
      );
      const { message, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: message });
        navigate("/smtp-list");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {!id ? "Add SMTP" : "Edit SMTP"}
            </h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={detail.name}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, name: e.target.value }))
                  }
                />
                {errors.name && (
                  <div className="alert alert-danger mt-2">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Host
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={detail.host}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, host: e.target.value }))
                  }
                />
                {errors.host && (
                  <div className="alert alert-danger mt-2">{errors.host}</div>
                )}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Port
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={detail.port}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, port: e.target.value }))
                  }
                />
                {errors.port && (
                  <div className="alert alert-danger mt-2">{errors.port}</div>
                )}
              </div>
              <div className="mb-3 ">
                <label className={!id ? "form-label required" : "form-label"}>
                  Security Protocol
                </label>
                <select
                  name="secure"
                  className="form-control"
                  value={detail.secure}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, secure: e.target.value }))
                  }
                >
                  <option value="select">Select</option>
                  <option value="SSL">SSL</option>
                  <option value="TLS">TLS</option>
                  <option value="STARTTLS">STARTTLS</option>
                </select>
                {errors.secure && (
                    <div className="alert alert-danger mt-2">{errors.secure}</div>
                  )}
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  User
                </label>
                <input
                  type="text"
                  name="user"
                  className="form-control"
                  placeholder="User"
                  value={detail.user}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, user: e.target.value }))
                  }
                />
                {errors.user && (
                  <div className="alert alert-danger mt-2">{errors.user}</div>
                )}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Passsword"
                  value={detail.password}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, password: e.target.value }))
                  }
                />
                {errors.password && (
                  <div className="alert alert-danger mt-2">{errors.password}</div>
                )}
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Edit Smtp" : "Add Smtp"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
