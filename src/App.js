import * as React from "react";
import "./App.css";
import OrganizationSearch from "./components/OrganizationSearch";
import Organization from "./components/Organization";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {organization: "Zeit"};
  }

  handleQueryChange = query => {
    this.setState({organization: query});
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GH Explorer</h1>
        </header>
        <span className="App-intro">
          <OrganizationSearch onQueryChange={this.handleQueryChange} />
        </span>
        <Organization organization={this.state.organization} />
      </div>
    );
  }
}

export default App;
