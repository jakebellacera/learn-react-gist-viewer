import React from "react"
import Gist from "../Gist"

const Main = ({ gist }) => (
  <div className="main">
    {gist ? <Gist gist={gist} /> : (
      <div className="main-welcome">
        <h1>Welcome!</h1>
        <p>Start viewing Gists by selecting one from the list on the left.</p>
      </div>
    )}
  </div>
);

export default Main;
