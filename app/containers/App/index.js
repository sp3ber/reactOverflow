import React, { PropTypes, Component } from 'react';
import 'reset-css/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './app.scss';
require('es6-promise').polyfill();

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

export default App;
