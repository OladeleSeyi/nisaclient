import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import NewTest from "./containers/NewTest";
import Records from "./containers/Records";
import Test from "./containers/Test";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/new">
        <NewTest />
      </Route>
      <Route exact path="/tests">
        <Records />
      </Route>
      <Route exact path="/test/:id">
        <Test />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
