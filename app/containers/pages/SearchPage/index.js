import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { index, search, searchQueryName } from '../../../constants/routes';
import { questionsRequest, clearQuestions } from '../../../actions/questionsActions';
import SearchForm from '../../../components/SearchForm';
import Button from '../../../components/Button';
import InvalidSearchResult from '../../../components/InvalidSearchResult';
import QuestionsTable from '../../../components/QuestionsTable';
import Spinner from '../../../components/Spinner';

import './styles.scss';

class SearchPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    questionsRequest: PropTypes.func.isRequired,
    questions: PropTypes.array,
    clearQuestions: PropTypes.func.isRequired,
    hasMoreQuestions: PropTypes.bool,
    loading: PropTypes.bool,
    errors: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
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
  componentWillUnmount() {
    this.props.clearQuestions();
  }
  onSearchFormSubmit(value) {
    this.props.clearQuestions();
    browserHistory.push(`${search}?${searchQueryName}=${value}`);
    this.getQuestions(value);
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
    const { location, hasMoreQuestions, questions, loading, errors } = this.props;
    const { query } = location;
    const { [searchQueryName]: question } = query;
    return (
      <section className="search-page container p-t-1 p-b-2">
        <div className="search-page__breadcrumb">
          <Link to={index}>Back to main</Link>
        </div>
        <div className="p-t-2 p-b-2">
          <SearchForm onSubmit={this.onSearchFormSubmit} initialValue={question} />
        </div>
        <div className="p-t-2 p-b-2 search-page__content">
          {
            !!loading && !questions.length && <Spinner className="search-page__spinner" />
          }
          {
            !questions.length && !loading &&
              <InvalidSearchResult title="Sorry">
                {
                  !!errors ?
                    'Something goes wrong'
                    :
                    'No results'
                }
              </InvalidSearchResult>
          }
          {
            !!questions.length && <QuestionsTable questions={questions} />
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
    loading,
    errors
  } = state.questions;
  return { questions, hasMoreQuestions, loading, errors };
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  questionsRequest,
  clearQuestions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
