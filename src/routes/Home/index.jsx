import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

import "./index.scss";

// Routes
const News = loadable(() => import("./News"));
const Records = loadable(() => import("./Records"));
const Profile = loadable(() => import("./Profile"));

const Home = () => {
  const { path } = useRouteMatch();
  return (
    <div className="home">
      <Switch>
        <Route path={`${path}/records`}>
          <Records />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile />
        </Route>
        <Route exact path={`${path}/`}>
          <News />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
