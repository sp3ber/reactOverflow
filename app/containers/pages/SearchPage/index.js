import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search, searchQueryName } from '../../../constants/routes';
import { questionsRequest, clearQuestions } from '../../../actions/questionsActions';
import SearchForm from '../../../components/SearchForm';
import Button from '../../../components/Button';
import InvalidSearchResult from '../../../components/InvalidSearchResult';

import './styles.scss';

class SearchPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    questionsRequest: PropTypes.func.isRequired,
    questions: PropTypes.array,
    clearQuestions: PropTypes.func.isRequired,
    hasMoreQuestions: PropTypes.bool,
    loading: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.onGetMoreHandler = this.onGetMoreHandler.bind(this);
  }
  componentDidMount() {
    this.getQuestions();
  }
  onSearchFormSubmit(value) {
    this.props.clearQuestions();
    const query = encodeURI(value);
    browserHistory.push(`${search}?${searchQueryName}=${query}`);
    this.getQuestions(query);
  }
  onGetMoreHandler() {
    this.getQuestions();
  }

  getQuestions(query) {
    const question = query || this.props.location.query[searchQueryName];
    if (typeof question === 'string') {
      this.props.questionsRequest(question);
    }
  }
  render() {
    const { location, hasMoreQuestions, questions, loading } = this.props;
    const { query } = location;
    const { [searchQueryName]: question } = query;
    return (
      <section className="search-page container">
        <div className="p-t-2 p-b-2">
          <SearchForm onSubmit={this.onSearchFormSubmit} initialValue={question} />
        </div>
        <div className="p-t-2 p-b-2">
          {
            (!questions.length && !loading) ?
              <InvalidSearchResult
                title="hello world"
                isError
              />
              :
              JSON.stringify(questions)
          }
        </div>
        <div className="search-page__controls">
          {
            hasMoreQuestions &&
              <Button
                disabled={loading}
                isLoading={loading}
                type="button"
                onClick={this.onGetMoreHandler}>
                Get more questions
              </Button>
          }
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const {
    items: questions,
    has_more: hasMoreQuestions,
    loading
  } = state.questions;
  return { questions, hasMoreQuestions, loading };
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  questionsRequest,
  clearQuestions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
