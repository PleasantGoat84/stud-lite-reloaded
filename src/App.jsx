import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import loadable from "@loadable/component";

import api from "./api";

import "./App.scss";

// Routes
import Header from "./Header";
import DialogSystem from "./components/DialogSystem";

import { cloneDeep } from "lodash";

const Login = loadable(() => import("./routes/Login"));
const SSO = loadable(() => import("./routes/SSO"));
const Home = loadable(() => import("./routes/Home"));
const Nav = loadable(() => import("./routes/Home/Nav"));

export function normalizeDate(d) {
  return new Date(d).toISOString().substr(0, 10);
}

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/sso">
        <SSO {...props} />
      </Route>
      <Route path="/home">
        {props.loggedIn ? <Home {...props} /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/">
        <Login {...props} />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

const App = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [dialogMsg, setDialogMsg] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      const fetchUser = async () => {
        const res = await api.get("user");
        setUser(res.data);
      };

      fetchUser();
    }
  }, [loggedIn]);

  const closeDialog = (idx) => () => {
    const newMsg = cloneDeep(dialogMsg);
    newMsg.splice(idx, 1);
    setDialogMsg(newMsg);
  };

  const updateDialog = (idx, newConfig) => {
    const newMsg = cloneDeep(dialogMsg);
    newMsg[idx] = { ...newMsg[idx], ...newConfig };
    setDialogMsg(newMsg);
  };

  const openDialog = (config) => {
    const newMsg = cloneDeep(dialogMsg);
    const idx = newMsg.push(config) - 1;
    setDialogMsg(newMsg);
    return idx;
  };

  const routesProps = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
    openDialog,
    updateDialog,
  };

  const dialogSysProps = { dialogMsg, setDialogMsg, closeDialog };

  return (
    <Router>
      <div className="App">
        <Header mini={loggedIn} />
        <main>
          <Routes {...routesProps} />
        </main>
        {loggedIn && <Nav />}
        <DialogSystem {...dialogSysProps} />
      </div>
    </Router>
  );
};

export default App;
