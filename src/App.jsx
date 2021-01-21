import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import loadable from "@loadable/component";

import "./App.scss";

// Routes
import Header from "./Header";
const Login = loadable(() => import("./routes/Login"));
const SSO = loadable(() => import("./routes/SSO"));
const Home = loadable(() => import("./routes/Home"));
const Nav = loadable(() => import("./routes/Home/Nav"));

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/sso">
        <SSO {...props} />
      </Route>
      <Route path="/home">
        {props.loggedIn ? <Home /> : <Redirect to="/" />}
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
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const routesProps = { user, setUser, loggedIn, setLoggedIn };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes {...routesProps} />
        </main>
        {loggedIn && <Nav />}
      </div>
    </Router>
  );
};

export default App;
