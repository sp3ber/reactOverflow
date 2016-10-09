import React, { PropTypes, Component } from 'react';
import './App.scss';
import 'reset-css/reset.css'
import 'bootstrap/dist/css/bootstrap.css';
import SearchForm from '../../components/SearchForm';

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

export default App;