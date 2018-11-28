import React from "react"

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData()
      .then((data) => {
        this.setState({ data: this.htmlEncodeString(data) });
      });
  }

  render() {
    let body;

    if (this.state.data) {
      body = (
        <pre>
          <code>
            {this.htmlDecodeString(this.state.data)}
          </code>
        </pre>
      );
    } else if (this.state.loaded) {
      body = <p>Unable to load file :(</p>;
    } else {
      body = <p>Loading...</p>;
    }

    return (
      <div className="gist-file">
        <h3 className="gist-file-name">
          {this.props.name}
        </h3>
        <div className="gist-file-body">
          {body}
        </div>
      </div>
    )
  }

  fetchData() {
    return fetch(this.props.file.raw_url)
      .then((res) => {
        if (res.ok) {
          return res.text()
        }
        throw new Error("Could not fetch file!");
      });
  }

  htmlEncodeString(str) {
    return str.replace(/[\u00A0-\u9999<>&]/gim, (i) => {
      return '&#'+i.charCodeAt(0)+';';
    });
  }

  htmlDecodeString(str) {
    return str.replace(/&#([0-9]{1,3});/gi, (match, num) => {
      return String.fromCharCode(parseInt(num));
    });
  }
}

export default File
