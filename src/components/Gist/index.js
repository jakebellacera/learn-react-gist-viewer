import React from "react";
import File from "../File";

const Gist = ({ gist }) => (
  <div className="gist">
    <h1>{`${gist.owner.login}/${Object.keys(gist.files).sort()[0]}`}</h1>
    <h2>Files</h2>
    {Object.keys(gist.files).sort().map(name => (
      <File
        key={name}
        name={name}
        file={gist.files[name]}
      />
    ))}
  </div>
);

export default Gist;
