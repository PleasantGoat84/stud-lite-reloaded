import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import loadable from "@loadable/component";

import api from "./api";

// Routes
import Header from "./Header";
import DialogSystem from "./components/DialogSystem";

const Login = loadable(() => import("./routes/Login"));
const SSO = loadable(() => import("./routes/SSO"));
const Home = loadable(() => import("./routes/Home"));
const Nav = loadable(() => import("./routes/Home/Nav"));

export const LOCAL_DAY = ["日", "一", "二", "三", "四", "五", "六"];

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

  useEffect(() => {
    if (loggedIn) {
      const fetchUser = async () => {
        const res = await api.get("user");
        setUser(res.data);
      };

      fetchUser();
    }
  }, [loggedIn]);

  const routesProps = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header mini={loggedIn} />
        <main
          className={
            "flex flex-col flex-grow mt-6 w-full bg-light" +
            (loggedIn ? " mb-20" : "")
          }
        >
          <DialogSystem>
            <Routes {...routesProps} />
          </DialogSystem>
        </main>

        {loggedIn && <Nav />}
      </div>
    </Router>
  );
};

export default App;
