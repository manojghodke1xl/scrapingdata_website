import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import DetailsForm from "../comps/detailsForm";
import SpouseForm from "../comps/spouseForm";
import ChildrenForm from "../comps/childrenForm";

export default function EditMember() {
  const { mid } = useParams();
  const navigate = useNavigate();

  const { alert, setLoading } = useContext(GlobalContext);

  const [step, setStep] = useState(1);

  const [detail, setDetail] = useState({
    firstname: "",
    lastname: "",
    dateofbirth: "",
    mobilenumber: "",
    emailaddress: "",
    ismarried: false,
  });

  const [spouse, setSpouse] = useState({
    firstname: "",
    dateofbirth: "",
    mobilenumber: "",
    haschildren: false,
  });

  const [children, setChildren] = useState([
    {
      firstname: "",
      dateofbirth: "",
    },
  ]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/member/edit/${mid}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        const { detail, spouse, children } = data;
        if (detail) setDetail(detail);
        if (spouse) setSpouse(spouse);
        if (children?.length) setChildren(children);
      } else {
        throw new Error(error);
      }
    })()
      .catch((error) => {
        alert({ type: "danger", title: "Error !", text: error.message });
        navigate("/dashboard");
      })
      .finally(() => setLoading(false));
  }, [alert, mid, navigate, setLoading, step]);

  const handleDetails = async (value) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/member/detail/${mid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify(value),
      });
      const { data, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: data });
        if (value.ismarried) setStep(2);
        else navigate("/dashboard");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    }
  };

  const handleSpouse = async (value) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/member/spouse/${mid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify(value),
      });
      const { data, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: data });
        if (value.haschildren) setStep(3);
        else navigate("/dashboard");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    }
  };

  const handleChildren = async (value) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/member/children/${mid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify(value),
      });
      const { data, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: data });
        navigate("/dashboard");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          {step === 1 && <DetailsForm value={detail} onSubmit={handleDetails} />}
          {step === 2 && <SpouseForm value={spouse} onSubmit={handleSpouse} goBack={() => setStep(1)} />}
          {step === 3 && <ChildrenForm value={children} onSubmit={handleChildren} goBack={() => setStep(2)} />}
        </div>
      </div>
    </div>
  );
}
