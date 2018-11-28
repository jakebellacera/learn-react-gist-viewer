import React from "react"

const Sidebar = ({ gists, selected, loaded, onClick }) => {
  let listing;

  if (gists.length) {
    listing = (
      <ol className="sidebar-listing">
        {gists.map(gist => (
          <li
            key={gist.id}
            className="sidebar-listing-item"
          >
            <button
              className={`sidebar-listing-item-button${gist.id === selected ? " selected" : ""}`}
              onClick={() => onClick(gist.id)}
            >
              {gist.name}
            </button>
          </li>
        ))}
      </ol>
    );
  } else if (loaded) {
    listing = (
      <div className="sidebar-listing-status">
        No gists found :(
      </div>
    );
  } else {
    listing = (
      <div className="sidebar-listing-status">
        Loading...
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h2 className="sidebar-header">Gists</h2>
      {listing}
    </div>
  );
};

export default Sidebar;
