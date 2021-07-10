import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "../../App.css";
import axios from "../../axios";
import NotStudent from "./NotStudent";
import Main from "./Main";
import "./Styles.css";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const Dashboard = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const history = useHistory();

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
          for (var key in res.data) {
            if (res.data[key] == null) {
              setTimeout(function () {
                alert("Please Update your basic Details");
                history.push("/dashboard/profile");
              }, 1000);
              break;
            }
          }
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
  }, [setUser, setIsAuthenticated, setauthorised, history]);

  const StudentDash = () => {
    return (
      <div className="StudentDash">
        <CssBaseline />
        <ToastContainer />
        <Main logout={logout} />
        <Container maxWidth="xl">
          <h4 class="amma-quote">
            <i>
              "ENLIGHTENMENT means the ability to RECOGNISE ONESELF in ALL
              living creatures"
            </i>{" "}
            - AMMA
          </h4>
          <Grid container>
            <Grid
              item
              xs={7}
              container
              spacing={0}
              direction="column"
              style={{ paddingTop: "60px", paddingLeft: "250px" }}
            >
              <h5 align="left">EMS-Student Portal Walkthrough Video</h5>
              <br></br>
              <iframe
                title="student walkthrough"
                width="720"
                height="420"
                align="center"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              ></iframe>
            </Grid>
            <Grid
              item
              xs={5}
              style={{ paddingLeft: "250px", paddingTop: "100px" }}
            >
              <h5>Course Cirriculum:</h5>
              <h6>view</h6>
              <br></br>
              <h5>Calendar:</h5>
              <DayPicker />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

  return authorised ? StudentDash() : <NotStudent />;
};

export default Dashboard;
