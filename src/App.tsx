import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

import "./App.css";
import Header from "./Header";

// Routes
const Login = loadable(() => import("./routes/Login"));

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </main>
        <footer></footer>
      </div>
    </Router>
  );
};

export default App;
