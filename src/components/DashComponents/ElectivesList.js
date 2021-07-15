import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import "../../App.css";
import "./Styles.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../axios";
import Main from "./Main";

import NotStudent from "./NotStudent";
import electivedb from "./TableComponents/electives.json";
import schema from "./TableComponents/electiveschema.json";
import Table from "./TableComponents/Table";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

//import { AuthContext } from "../../Contexts/AuthContext";
//import { UserContext } from "../../Contexts/UserContext";
//import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const ElectivesList = () => {
  //const [, setIsAuthenticated] = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      //setIsAuthenticated(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(electivedb);
      }, 2000);
    }).then((result) => {
      setData(result);
    });
  });

  function ElectivesList() {
    return (
      <div>
        <CssBaseline />
        <Main />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">List of Chosen Electives</h1>
          <br></br>
          <br></br>

          <Container
            maxwidth="md"
            style={{ paddingLeft: "90px", paddingRight: "90px" }}
          >
            <Table headers={Object.keys(schema)} rows={data} />
          </Container>

          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }

  const getData = async () => {
    axios
      .get("/dashboard/", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setRole(parseRes.user_role);
        setUsername(parseRes.username);
      })
      .catch((er) => {
        console.log(er.response.data);
      });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  // return role === "student" ? <StudentDash /> : <NotStudent />;
  return <ElectivesList />;
};

export default ElectivesList;
