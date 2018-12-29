import React from "react";
import File from "../File";

const Gist = ({ match, gists }) => {
  if (Object.keys(gists).length === 0) {
    return (
      <div className="gist">
        <p>Loading gists...</p>
      </div>
    );
  }

  const gist = gists[match.params.id];

  if (gist) {
    return (
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
  } else {
    return (
      <div className="gist">
        <p>Cannot find gist! The cache may be stale or you may have passed an invalid id.</p>
      </div>
    );
  }
};

export default Gist;
