import React from "react"
import Main from "../Main";
import Sidebar from "../Sidebar";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingGist: null,
      loaded: false,
      gists: {},
      listing: []
    };
  }

  componentDidMount() {
    this.fetchGists()
      .then(gists => {
        this.setState(Object.assign(gists.reduce((state, gist) => (
          {
            gists: {
              ...state.gists,
              [gist.id]: gist
            },
            listing: [
              ...state.listing,
              { id: gist.id, name: `${gist.owner.login}/${Object.keys(gist.files).sort()[0]}` }
            ]
          }
        ), this.state), { loaded: true }));
      })
      .catch(() => {
        this.setState({ loaded: true });
      });
  }

  viewGist(id) {
    this.setState({ viewingGist: id });
  }

  render() {
    return (
      <div className="app">
        <Main gist={this.state.gists[this.state.viewingGist]} />
        <Sidebar
          gists={this.state.listing}
          selected={this.state.viewingGist}
          loaded={this.state.loaded}
          onClick={(id) => this.viewGist(id)}
        />
      </div>
    );
  }

  fetchGists() {
    return fetch("https://api.github.com/gists/public")
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Could not fetch Gists!");
      });
  }
}

export default App
