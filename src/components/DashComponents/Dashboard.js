import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "../../App.css";
import axios from "../../axios";
import NotStudent from "./NotStudent";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const Dashboard = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const logout = async (e) => {
    try {
      localStorage.removeItem("token");
      setUser("");
      setauthorised(false);
      setIsAuthenticated(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      axios
        .get("/dashboard/", {
          headers: { token: localStorage.token },
          "Content-type": "application/json",
        })
        .then((res) => {
          const stringRes = JSON.stringify(res.data);
          setauthorised(true);
          setUser(stringRes);
        })
        .catch((er) => {
          console.log(er.response);
          toast.error(er.response.data);
          if (er.response.status === 403) {
            localStorage.removeItem("token");
            setUser("");
            setauthorised(false);
            setTimeout(function () {
              setIsAuthenticated(false);
            }, 3000);
          }
        });
    };
    getData();
  }, [setUser, setIsAuthenticated, setauthorised]);

  const StudentDash = () => {
    return (
      <div>
        <ToastContainer />
        <h1>Student Dashboard</h1>
        <h5>Welcome {user}</h5>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
    );
  };

  return authorised ? StudentDash() : <NotStudent />;
};

export default Dashboard;
