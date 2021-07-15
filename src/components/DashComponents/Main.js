import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import NotificationsIcon from "@material-ui/icons/Notifications";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    openNestedPublish: false,
    openNestedDept: false,
    openNestedFaculty: false,
    openNestedCourse: false,
    openNestedBatch: false,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logout();
  };

  handleClickPublish = () => {
    this.setState({ openNestedPublish: !this.state.openNestedPublish });
    this.setState({ open: true });
  };

  handleClickDept = () => {
    this.setState({ openNestedDept: !this.state.openNestedDept });
    this.setState({ open: true });
  };

  handleClickFaculty = () => {
    this.setState({ openNestedFaculty: !this.state.openNestedFaculty });
    this.setState({ open: true });
  };

  handleClickCourse = () => {
    this.setState({ openNestedCourse: !this.state.openNestedCourse });
    this.setState({ open: true });
  };

  handleClickBatch = () => {
    this.setState({ openNestedBatch: !this.state.openNestedBatch });
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed,
                }}
              />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
              align="left"
              style={{ paddingLeft: "20px" }}
            >
              <Link
                to="/dashboard"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                EMS - Student Portal
              </Link>
            </Typography>

            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                style={{ paddingRight: "30px" }}
              >
                <h5 style={{ paddingRight: "20px", paddingTop: "5px" }}>
                  Student
                </h5>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={this.handleClose}
                  component={Link}
                  to="/dashboard/profile"
                >
                  Update Profile
                </MenuItem>
                <MenuItem
                  onClick={this.handleClose}
                  component={Link}
                  to="/dashboard/setPassword"
                >
                  Change Password
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button key={"My Electives"}>
              <Link
                to="/dashboard/electiveslist"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
              </Link>
              <Link
                to="/dashboard/electiveslist"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ListItemText primary={"My Electives"} />
              </Link>
            </ListItem>
            <ListItem button key={"Notifications"}>
              <Link
                to="/dashboard/notifications"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
              </Link>
              <Link
                to="/dashboard/notifications"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ListItemText primary={"Notifications"} />
              </Link>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
