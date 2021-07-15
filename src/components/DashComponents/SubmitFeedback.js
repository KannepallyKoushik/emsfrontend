import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import "../../App.css";
import axios from "../../axios";
import Main from "./Main";
import "./Styles.css";
import NotStudent from "./NotStudent";
import submitfbdb from "./TableComponents/submitfeedback.json";
import schema from "./TableComponents/submitfbschema.json";
import Table from "./TableComponents/FeedbackTable";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const SubmitFeedback = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  const [data, setData] = useState(null);
  const [updated, setUpdated] = useState(false);

  const classes = useStyles();
  const [state, setState] = React.useState({
    subject1: false,
    subject2: false,
    subject3: false,
    subject4: false,
    subject5: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { subject1, subject2, subject3, subject4, subject5 } = state;
  const error =
    [subject1, subject2, subject3, subject4, subject5].filter((v) => v)
      .length !== 3;

  const userObj = JSON.parse(user);

  const handleSubmit = (e) => {};

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
        resolve(submitfbdb);
      }, 2000);
    }).then((result) => {
      setData(result);
    });
  });

  const SubmitFeedback = () => {
    return (
      <div>
        <CssBaseline />
        <Main logout={logout} />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">Submit Course Feedbacks</h1>
          <br></br>
          <br></br>
          <Container
            maxwidth="md"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
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

  return authorised ? SubmitFeedback() : <NotStudent />;
};

export default SubmitFeedback;
