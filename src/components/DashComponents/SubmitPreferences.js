import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

import "../../App.css";
import axios from "../../axios";
import Main from "./Main";
import "./Styles.css";
import NotStudent from "./NotStudent";
import Table from "./TableComponents/Table";

// import submitdb from "./TableComponents/preferences.json";
import schema from "./TableComponents/submitschema.json";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

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

const SubmitPreferences = ({ match }) => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const [submitdb, setSubmitdb] = useState([]);

  var sub_state = {};

  useEffect(() => {
    const eid = match.params.id;
    const body = { eid };
    axios
      .post("/dashboard/getEventData", body, {
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const event = res.data;
        const event_array = [];
        for (const event_data of event) {
          const formatData = {
            id: event_data.cid,
            Course_Code: event_data.c_code,
            Course_Name: event_data.cname,
            Faculty_Name: event_data.facname,
            Faculty_Email: event_data.fac_email,
            Course_Description: event_data.cdescription,
            Credits: event_data.course_credit,
            Feedback: "",
            Demo_Class: event_data.demo_link,
          };
          event_array.push(formatData);
          sub_state[event_data.cid] = false;
        }
        setSubmitdb(event_array);
      })
      .catch((err) => {
        const status = err;
        console.log(status);
        toast.error(status);
      });
  }, []);

  const [data, setData] = useState(null);

  useEffect(() => {
    new Promise((resolve) => {
      // setTimeout(() => {
      resolve(submitdb);
      // }, 2000);
    }).then((result) => {
      setData(result);
    });
  }, [submitdb]);

  const classes = useStyles();

  const [state, setState] = React.useState(sub_state);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {};

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

  const SubmitPref = () => {
    return (
      <div>
        <CssBaseline />
        <Main logout={logout} />
        <ToastContainer />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">Submit Course Preferences</h1>
          <br></br>
          <br></br>
          <Container
            maxwidth="md"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            <Table headers={Object.keys(schema)} rows={data} />
          </Container>
          <br></br>
          <Container
            className="boxed"
            maxWidth="xs"
            style={{ paddingLeft: "98px" }}
          >
            <FormControl
              required
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel component="legend" align="center">
                Choose Subjects
              </FormLabel>
              <FormGroup>
                {submitdb.map(({ id, Course_Code }) => {
                  // console.log(state[id] + " - " + Course_Code + " " + id);
                  // <FormControlLabel
                  //   control={
                  //     <Checkbox
                  //       checked={state[id]}
                  //       onChange={handleChange}
                  //       name={id}
                  //     />
                  //   }
                  //   label={Course_Code}
                  // />;
                  <label class="checkbox-checked">
                    <input
                      name={id}
                      type="checkbox"
                      value={state[id]}
                      checked={state[id]}
                      onChange={handleChange}
                    >
                      <span class="label-text">{Course_Code} </span>
                    </input>
                  </label>;
                })}

                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={subject5}
                      onChange={handleChange}
                      name="subject5"
                    />
                  }
                  label="ML"
                /> */}
              </FormGroup>
              <FormHelperText>Select Exactly 3 Subjects</FormHelperText>
              <br></br>
              <Button
                id="passubmit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit Choice
              </Button>
            </FormControl>
          </Container>
          <br></br>
          <br></br>
        </Container>
        <br></br>
      </div>
    );
  };

  return authorised ? SubmitPref() : <NotStudent />;
};

export default SubmitPreferences;
