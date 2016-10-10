import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search, searchQueryName } from '../../../constants/routes';
import { questionsRequest } from '../../../actions/questionsActions';
import SearchForm from '../../../components/SearchForm';
import InvalidSearchResult from '../../../components/InvalidSearchResult'

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
    const newQuery = nextProps.location.query[searchQueryName];
    const oldQuery = this.props.location.query[searchQueryName];
    if ( newQuery !== oldQuery){
      this.getQuestions(newQuery);
    }
  }
  onSearchFormSubmit(value) {
    const query = encodeURI(value);
    browserHistory.push(`${search}?${searchQueryName}=${query}`);
  }
  getQuestions(query) {
    const question = query || this.props.location.query[searchQueryName];
    if (typeof question === 'string') {
      this.props.questionsRequest(question);
    }
  }
  render() {
    const { location } = this.props;
    const { query } = location;
    const { [searchQueryName]: question } = query;
    return (
      <section className="container">
        <div className="p-t-2 p-b-2">
          <SearchForm onSubmit={this.onSearchFormSubmit} initialValue={question} />
        </div>
        {
          this.props.hasMoreQuestions && 'has more queestions!'
        }
        <div className="p-t-2 p-b-2">
          {
            !this.props.questions.length ?
              <InvalidSearchResult
                title="hello world"
                isError
              />
              :
              JSON.stringify(this.props.questions)
          }
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { items: questions, has_more: hasMoreQuestions, currentPage } = state.questions;
  return { questions, hasMoreQuestions, currentPage };
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  questionsRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
