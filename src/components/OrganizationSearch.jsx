import * as React from "react";
import "./OrganizationSearch.css";

export default class OrganizationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onQueryChange(this.state.value);
  }

  render() {
    return (
      <form className="org-search" onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Enter a GitHub Organization"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
