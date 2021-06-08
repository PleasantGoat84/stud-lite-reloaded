import React from "react";
import { Switch, Route, useRouteMatch, Redirect, Link } from "react-router-dom";
import loadable from "@loadable/component";

// Routes
const MainMenu = loadable(() => import("./MainMenu"));
const Timetable = loadable(() => import("./Timetable"));

const Records = (props) => {
  const { path, isExact } = useRouteMatch();

  return (
    <div className="records">
      <Switch>
        <Route path={`${path}timetable`}>
          <Timetable {...props} />
        </Route>
        <Route exact path={`${path}`}>
          <MainMenu {...props} />
        </Route>
        <Route>
          <Redirect to={`${path}`} />
        </Route>
      </Switch>
      {!isExact && (
        <Link to={path} className="no-under">
          <button className="mx-auto mt">返回</button>
        </Link>
      )}
    </div>
  );
};

export default Records;
