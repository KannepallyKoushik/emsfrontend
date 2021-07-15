import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import "../../App.css";
import axios from "../../axios";
import Main from "./Main";
import "./Styles.css";
import NotStudent from "./NotStudent";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(5),
      width: "50ch",
    },
  },
}));

const handleSubmit = (e) => {};

const Branch = () => {
  const [branch, setBranch] = useState("");

  const getBranchData = async () => {
    axios
      .get("/dashboard/getDept", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setBranch(parseRes);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  getBranchData();

  const [depID, setDepID] = useState("");
};

const Batch = () => {
  const [batch, setBatch] = useState("");

  const getBatchData = async () => {
    axios
      .get("/dashboard/getBatches", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setBatch(parseRes);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  getBatchData();

  const [batchID, setBatchID] = useState("");
};

function WriteFeedback() {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const [updated, setUpdated] = useState(false);

  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

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

  const WriteFeedback = () => {
    return (
      <div>
        <CssBaseline />
        <Main logout={logout} />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">Submit Feedback for (Course Name)</h1>
          <br></br>
          <Container
            maxWidth="sm"
            style={{ paddingLeft: "50px", paddingRight: "100px" }}
          >
            <br></br>
            <br></br>
            <TextField
              id="outlined-multiline-static"
              label="Feedback Text"
              multiline
              rows={7}
              variant="outlined"
              fullWidth="true"
            />
            <br></br>
            <br></br>
            <Container maxWidth="xs" style={{ paddingLeft: "170px" }}>
              <Button variant="contained" color="primary" align="center">
                Submit
              </Button>
            </Container>
            <br></br>
            <br></br>
          </Container>
        </Container>
        <br></br>
      </div>
    );
  };

  return authorised ? WriteFeedback() : <NotStudent />;
}

export default WriteFeedback;
