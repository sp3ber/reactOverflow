import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchQueryName } from '../../../constants/routes';
import { questionsRequest } from '../../../actions/questionsActions';

class SearchPage extends Component {
  static propTypes = {
    location: PropTypes.object,
    questionsRequest: PropTypes.func
  };
  render() {
    const { questionsRequest, location } = this.props;
    const { query } = location;
    const { [searchQueryName]: question } = query;
    return (
      <div className="container">
        Результат по запросу {question}
        <button onClick={questionsRequest}>Get answers</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { value } = state.counter;
  return { value };
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  questionsRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
