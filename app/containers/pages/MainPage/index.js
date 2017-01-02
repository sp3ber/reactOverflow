import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { search, searchQueryName } from '../../../constants/routes';
import SearchForm from '../../../components/SearchForm';

import './styles.scss';

class MainPage extends Component {
  static propTypes = {
    location: PropTypes.object
  };
  onSearchFormSubmit(value) {
    browserHistory.push(`${search}?${searchQueryName}=${value}`);
  }
  render() {
    const initialValue = this.props.location.query[searchQueryName] ||
      'Как работают замыкания?';
    return (
      <div className="main-page">
        <section className="main-page__form">
          <div className="container pt-3 pb-3">
            <h2 className="m-b-1">Enter your question</h2>
            <SearchForm
              initialValue={initialValue}
              onSubmit={this.onSearchFormSubmit} />
          </div>
        </section>
        <section className="main-page__present container">
          <p className="main-page__p pt-1 pb-1">
            This is the best Miha service sponsored by
          </p>
          <div className="main-page__brand-logo">
            <span className="sr-only">Stack Overflow</span>
          </div>
        </section>
      </div>
    );
  }
}

export default MainPage;
