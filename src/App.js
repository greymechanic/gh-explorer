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
  render() {
    let hasQuery = !this.state.organization;
    return (
      <div className={classnames("app-wrapper", {intro: !hasQuery})}>
        <div className={classnames("app-nav", {intro: !hasQuery})}>
          <header className="app-header">
            <h1
              className={classnames("app-title", {
                isCompact: !!this.state.organization,
              })}
            >
              GH Explorer
            </h1>
          </header>
          <div className="app-org-search">
            <OrganizationSearch onQueryChange={this.handleQueryChange} />
          </div>
        </div>
        {this.state.organization ? (
          <Organization organization={this.state.organization} />
        ) : null}
      </div>
    );
  }
}

export default App;
