import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import "../../App.css";
import axios from "../../axios";
import Main from "./Main";
import "./Styles.css";
import NotStudent from "./NotStudent";
import feedbackdb from "./TableComponents/feedback.json";
import schema from "./TableComponents/feedbackschema.json";
import Table from "./TableComponents/Table";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const FeedbackList = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  const [data, setData] = useState(null);

  const [updated, setUpdated] = useState(false);

  const userObj = JSON.parse(user);

  useEffect(() => {
    for (var key in userObj) {
      if (userObj[key] == null) {
        setUpdated(false);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(feedbackdb);
      }, 2000);
    }).then((result) => {
      setData(result);
    });
  });

  const FeedbackList = () => {
    return (
      <div>
        <CssBaseline />
        <Main logout={logout} />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">View Feedback of Courses</h1>
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
        <br></br>
      </div>
    );
  };

  return authorised ? FeedbackList() : <NotStudent />;
};

export default FeedbackList;
