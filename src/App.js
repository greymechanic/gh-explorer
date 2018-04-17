import * as React from "react";
import "./App.css";
import OrganizationSearch from "./components/OrganizationSearch";
import Organization from "./components/Organization";
import classnames from "classnames";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {organization: ""};
  }

  handleQueryChange = query => {
    this.setState({organization: query});
  };

  resetQuery = () => {
    this.setState({organization: ""});
  };

  render() {
    let hasQuery = !this.state.organization;
    return (
      // Because I'm quickly building this I'm keeping one set of DOM elements
      // and just checking whether there is a query in order to decide how to
      // display the content. With more time, I'd probably build two components
      // and toggle between them depending on whether there is data.
      <div className={classnames("app-wrapper", {detail: !hasQuery})}>
        <div className={classnames("app-nav", {detail: !hasQuery})}>
          <header className={classnames("app-header", {detail: !hasQuery})}>
            <h1
              className={classnames("app-title", {
                detail: !hasQuery,
              })}
              onClick={this.resetQuery}
            >
              GH Explorer
            </h1>
            <p>
              GH Explorer is a simple tool that allows a user to search for any
              organization on GitHub, browse that organization's repositories,
              and view recent commits.
            </p>
          </header>
          <div className="app-org-search">
            <OrganizationSearch onQueryChange={this.handleQueryChange} />
          </div>
        </div>
        {this.state.organization ? (
          <div className="app-detail">
            <Organization organization={this.state.organization} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
