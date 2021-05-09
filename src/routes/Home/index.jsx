import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

import { normalizeDate } from "../../App";
import api from "../../api";

import "./index.scss";

// Routes
const News = loadable(() => import("./News"));
const Records = loadable(() => import("./Records/"));
const Profile = loadable(() => import("./Profile"));

const Home = (props) => {
  const { path } = useRouteMatch();
  const [calendar, setCalendar] = useState({});
  const [news, setNews] = useState([]);
  const [quota, setQuota] = useState([]);

  useEffect(() => {
    const fetchCalendar = async () => {
      const d = new Date();
      const res = await api.get("calendar", {
        params: { d: normalizeDate(d) },
      });
      setCalendar({ date: d, notice: res.data.notice });
    };

    const fetchNews = async () => {
      const res = await api.get("news");
      setNews(res.data.news);
    };

    const fetchQuota = async () => {
      const res = await api.get("quota");
      setQuota(res.data);
    };

    fetchCalendar();
    fetchNews();
    fetchQuota();
  }, []);

  return (
    <div className="home">
      <Switch>
        <Route path={`${path}/records/`}>
          <Records {...props} />
        </Route>
        <Route path={`${path}/profile/`}>
          <Profile {...props} />
        </Route>
        <Route exact path={`${path}/`}>
          <News {...props} calendar={calendar} news={news} quota={quota} />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
