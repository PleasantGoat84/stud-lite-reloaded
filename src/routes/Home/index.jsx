import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

import api from "../../api";

import "./index.scss";

// Routes
const News = loadable(() => import("./News"));
const Records = loadable(() => import("./Records"));
const Profile = loadable(() => import("./Profile"));

const Home = (props) => {
  const { path } = useRouteMatch();
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await api.get("calendar");
      setCalendar(res.data.notice);
    };

    fetchCalendar();
  }, []);

  return (
    <div className="home">
      <Switch>
        <Route path={`${path}/records`}>
          <Records {...props} />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile {...props} />
        </Route>
        <Route exact path={`${path}/`}>
          <News {...props} calendar={calendar} />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
