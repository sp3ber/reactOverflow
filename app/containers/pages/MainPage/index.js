import React, {Component} from 'react';
import SearchForm from '../../../components/SearchForm';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <section className="main-page__form">
          <div className="container p-t-2 p-b-2">
            <h2 className="m-b-1">Enter you question, mr.</h2>
            <SearchForm />
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