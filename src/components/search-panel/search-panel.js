import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
    this.search(query);
  };

  search = debounce((query) => {
    this.props.onSearch(query);
  }, 2000);

  render() {
    return (
      <Input
        placeholder="Type to search..."
        className="search-panel"
        onChange={this.handleChange}
        value={this.state.query}
      />
    );
  }
}
