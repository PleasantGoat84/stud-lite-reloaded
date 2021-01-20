import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import loadable from "@loadable/component";

import "./App.scss";
import Header from "./Header";

// Routes
const Login = loadable(() => import("./routes/Login"));
const SSO = loadable(() => import("./routes/SSO"));

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/sso">
        <SSO {...props} />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
      <Route>
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes user={user} setUser={setUser} />
        </main>
      </div>
    </Router>
  );
};

export default App;
