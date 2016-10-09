import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { search, searchQueryName } from '../../../constants/routes';
import SearchForm from '../../../components/SearchForm';

class MainPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
  }
  onSearchFormSubmit(value) {
    const query = encodeURI(value);
    browserHistory.push(`${search}?${searchQueryName}=${query}`);
  }
  render() {
    const initialValue = this.props.location.query[searchQueryName] || '';
    return (
      <div className="main-page">
        <section className="main-page__form">
          <div className="container p-t-2 p-b-2">
            <h2 className="m-b-1">Enter you question, mr.</h2>
            <SearchForm
              initialValue={initialValue}
              onSubmit={this.onSearchFormSubmit}/>
          </div>
        </section>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainPage;
