import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchQueryName } from '../../../constants/routes';
import { questionsRequest } from '../../../actions/questionsActions';

class SearchPage extends Component {
  static propTypes = {
    location: PropTypes.object,
    questionsRequest: PropTypes.func,
    questions: PropTypes.array
  };
  componentDidMount() {
    this.getQuestions();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.query[searchQueryName]!==
      this.props.location.query[searchQueryName]
    ) {
      console.info('query changed!');
      this.getQuestions();
    }
  }
  getQuestions() {
    const question = this.props.location.query[searchQueryName];
    if (typeof question === 'string') {
      this.props.questionsRequest(question);
    }
  }
  render() {
    const { questionsRequest, location } = this.props;
    const { query } = location;
    const { [searchQueryName]: question } = query;
    console.info(this.props.questions);
    return (
      <div className="container">
        Результат по запросу {question}
        <div></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items: questions } = state.questions;
  return { questions };
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  questionsRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
