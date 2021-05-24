import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

// Routes
const MainMenu = loadable(() => import("./MainMenu"));
const Timetable = loadable(() => import("./Timetable"));

const Records = (props) => {
  const { path } = useRouteMatch();

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
    </div>
  );
};

export default Records;
