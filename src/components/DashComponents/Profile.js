import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import "../../App.css";
import axios from "../../axios";
import Main from "./Main";
import "./Styles.css";
import NotStudent from "./NotStudent";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

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

  const handleChangeBranch = (event) => {
    setDepID(event.target.value);
  };

  return (
    <Select
      labelId="branch"
      id="branch"
      value={depID}
      onChange={handleChangeBranch}
    >
      {[branch].map(({ dep_id, dep_name }) => {
        return (
          <MenuItem key={dep_id} value={dep_name}>
            {dep_name}
          </MenuItem>
        );
      })}
    </Select>
  );
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
  const handleChangeBatch = (event) => {
    setBatchID(event.target.value);
  };

  return (
    <Select
      labelId="batch"
      id="batch"
      value={batchID}
      onChange={handleChangeBatch}
    >
      {[batch].map(({ batch_id, pass_in, pass_out }) => {
        return (
          <MenuItem key={batch_id} value={batch_id}>
            {pass_in}-{pass_out}
          </MenuItem>
        );
      })}
    </Select>
  );
};

const Profile = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

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

  const UpdateProfile = () => {
    return (
      <div>
        <CssBaseline />
        <Main logout={logout} />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">Student Profile</h1>
          <Grid xs={12} container direction="column" className="batch">
            <TextField
              label="Full Name"
              defaultValue="Deep Pancholi"
              id="name"
              inputProps={{ readOnly: true }}
            />
            <br></br>

            <TextField
              label="Email ID"
              id="email"
              defaultValue="cb.en.p2cse20011@cb.students.amrita.edu"
              inputProps={{ readOnly: true }}
            />
            <br></br>
            <InputLabel id="branch">Branch</InputLabel>
            {updated ? (
              <TextField
                id="branch"
                defaultValue="Computer Science Engineering"
                inputProps={{ readOnly: true }}
              />
            ) : (
              Branch()
            )}
            <br></br>

            <br></br>

            <Grid container>
              <Grid
                container
                xs={6}
                direction="column"
                style={{ paddingRight: "7px" }}
              >
                <InputLabel id="batch">Batch</InputLabel>
                {updated ? (
                  <TextField
                    id="batch"
                    defaultValue="2020"
                    inputProps={{ readOnly: true }}
                  />
                ) : (
                  Batch()
                )}
              </Grid>

              <Grid
                container
                xs={6}
                direction="column"
                style={{ paddingLeft: "7px" }}
              >
                <InputLabel id="phone">Phone Number</InputLabel>
                <TextField id="phone" />
                <br></br>
              </Grid>
            </Grid>

            <br></br>
            <InputLabel id="address">Complete Address</InputLabel>
            <br></br>
            <TextField
              id="address"
              multiline
              variant="outlined"
              rows={2}
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "off",
                },
              }}
            />
          </Grid>
          <Container className="button" align="center" maxWidth="sm">
            <Button variant="contained" color="primary">
              Update Profile
            </Button>
          </Container>
          <br></br>
        </Container>
        <br></br>
      </div>
    );
  };

  return authorised ? UpdateProfile() : <NotStudent />;
};

export default Profile;
