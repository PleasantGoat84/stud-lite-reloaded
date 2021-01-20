import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

import "./App.scss";
import Header from "./Header";

// Routes
const Login = loadable(() => import("./routes/Login"));
const SSO = loadable(() => import("./routes/SSO"));

const Routes = ({ username, setUsername }) => {
  return (
    <Switch>
      <Route path="/sso">
        <SSO setUsername={setUsername} />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
};

const App = () => {
  const [username, setUsername] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes username={username} setUsername={setUsername} />
        </main>
      </div>
    </Router>
  );
};

export default App;
