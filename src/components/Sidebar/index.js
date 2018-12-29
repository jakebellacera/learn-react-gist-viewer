import React from "react"
import { NavLink } from "react-router-dom"

const Sidebar = ({ gists, loaded }) => {
  let listing;

  if (gists.length) {
    listing = (
      <ol className="sidebar-listing">
        {gists.map(gist => (
          <li
            key={gist.id}
            className="sidebar-listing-item"
          >
            <NavLink
              className={`sidebar-listing-item-button`}
              activeClassName="selected"
              to={`/gists/${gist.id}`}
            >
              {gist.name}
            </NavLink>
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
