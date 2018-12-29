import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Main from "../Main"
import Sidebar from "../Sidebar"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    return (
      <Router>
        <div className="app">
          <Main gists={this.state.gists} />
          <Sidebar
            gists={this.state.listing}
            loaded={this.state.loaded}
          />
        </div>
      </Router>
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
