import React, { Fragment, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import axios from "./axios";
import { AuthContext } from "./Contexts/AuthContext";
import { UserProvider } from "./Contexts/UserContext";
import { AuthorizationProvider } from "./Contexts/AuthorizationContext";

// Components
import Home from "./components/Home";
import SignIn from "./components/AuthComponents/SignIn";
import SignUp from "./components/AuthComponents/SignUp";
import ReportForm from "./components/AuthComponents/ReportForm";
import ChangePass from "./components/AuthComponents/ChangePass";
import ForgotPass from "./components/AuthComponents/ForgotPass";
import VerifyEmail from "./components/AuthComponents/VerifyEmail";
import Dashboard from "./components/DashComponents/Dashboard";
import SetPassword from "./components/DashComponents/SetPassword";
import Profile from "./components/DashComponents/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

  useEffect(() => {
    const checkAuthenticated = async () => {
      axios
        .post(
          "/auth/isverify",
          { dummybody: "dummy" },
          {
            headers: { token: localStorage.token },
            "Content-type": "application/json",
          }
        )
        .then((res) => {
          const parseRes = res.data;
          parseRes === true
            ? setIsAuthenticated(true)
            : setIsAuthenticated(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    checkAuthenticated();
  }, [setIsAuthenticated]);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/forgotPassword"
            render={(props) => <ForgotPass {...props} />}
          />
          <Route
            exact
            path="/changePassword/:id"
            render={(props) => <ChangePass {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <SignIn {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/report"
            render={(props) => <ReportForm {...props} />}
          />
          <Route
            exact
            path="/verifyEmail/:id"
            render={(props) => <VerifyEmail {...props} />}
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <SignUp {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />

          {/* <Route component={PageNotFound} /> */}
        </Switch>

        <AuthorizationProvider>
          <UserProvider>
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <Dashboard {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/dashboard/setPassword"
                render={() =>
                  isAuthenticated ? <SetPassword /> : <Redirect to="/login" />
                }
              />

              <Route
                exact
                path="/dashboard/profile"
                render={() =>
                  isAuthenticated ? <Profile /> : <Redirect to="/login" />
                }
              />
            </Switch>
          </UserProvider>
        </AuthorizationProvider>
      </Router>
    </Fragment>
  );
}

export default App;
