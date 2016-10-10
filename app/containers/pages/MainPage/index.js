import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { search, searchQueryName } from '../../../constants/routes';
import SearchForm from '../../../components/SearchForm';

import './styles.scss';

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
    const initialValue = this.props.location.query[searchQueryName] ||
      'Если React это как стул с пиками точеными, то получается, что Angular ...?';
    return (
      <div className="main-page">
        <section className="main-page__form">
          <div className="container p-t-3 p-b-3">
            <h2 className="m-b-1">Enter your question</h2>
            <SearchForm
              initialValue={initialValue}
              onSubmit={this.onSearchFormSubmit}/>
          </div>
        </section>
        <section className="main-page__present container">
          <p className="main-page__p p-t-1 p-b-1">
            This is the best Miha's service sponcored by
          </p>
          <div className="main-page__brand-logo ">
            <span className="sr-only">Stack Overflow</span>
          </div>
        </section>
      </div>
    );
  }
}

export default MainPage;
