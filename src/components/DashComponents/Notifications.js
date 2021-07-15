import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

import "../../App.css";
import axios from "../../axios";
import Main from "./Main";
import "./Styles.css";
import NotStudent from "./NotStudent";

import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
}));

function Notifications() {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const classes = useStyles();
  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [newEvents, setNewEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);

  useEffect(() => {
    const userObj = JSON.parse(user);

    const body = {
      depID: userObj.dep_id,
      batchID: userObj.batch_id,
    };

    axios
      .post("/dashboard/getNotification", body, {
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        setNewEvents(data);
      })
      .catch((err) => {
        const status = err.response.data;
        console.log(status);
        toast.error(status);
      });

    axios
      .post("/dashboard/getPastNotification", body, {
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        setOldEvents(data);
      })
      .catch((err) => {
        const status = err.response.data;
        toast.error(status);
      });
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

  const Events = () => {
    return (
      <div>
        <CssBaseline />
        <Main logout={logout} />
        <ToastContainer />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">Notifications</h1>
          <br></br>
          <List className={classes.root}>
            <ListItem button onClick={handleClick1}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="h5">New Events</Typography>}
              />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {newEvents.map(({ eid, ev_name, ev_deadline, event_type }) => {
                  if (event_type === "electives") {
                    return (
                      <ListItem button className={classes.nested}>
                        <Link
                          to={{
                            pathname: "/dashboard/submitpreferences/" + eid,
                          }}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          <ListItemText
                            primary={ev_name}
                            secondary={"Deadline: " + ev_deadline}
                          />
                        </Link>
                      </ListItem>
                    );
                  } else if (event_type === "feedback") {
                    return (
                      <ListItem button className={classes.nested}>
                        <Link
                          to={{
                            pathname: "/dashboard/submitfeedback/" + eid,
                          }}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          <ListItemText
                            primary={"Submit Course Feedbacks"}
                            secondary={"Deadline: 20 July 2021"}
                          />
                        </Link>
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Collapse>
            <br></br>
            <br></br>
            <ListItem button onClick={handleClick2}>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="h5">Old Events</Typography>}
              />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {oldEvents.map(({ eid, ev_name, ev_deadline }) => {
                  return (
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary={ev_name}
                        secondary={"Closed on " + ev_deadline}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </List>
          <br></br>
        </Container>
        <br></br>
      </div>
    );
  };

  return authorised ? Events() : <NotStudent />;
}

export default Notifications;
