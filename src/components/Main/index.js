import React from "react"
import { Route } from "react-router-dom"
import Gist from "../Gist"
import Home from "../Home";

const Main = ({ gists }) => (
  <div className="main">
    <Route exact path="/" component={Home} />
    <Route path="/gists/:id" render={props => <Gist {...props} gists={gists} />} />
  </div>
);

export default Main;
