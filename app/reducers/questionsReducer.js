import {
  QUESTIONS_REQUEST_STARTED,
  QUESTIONS_REQUEST_FINISHED,
  QUESTIONS_REQUEST_ERROR,
  CLEAR_QUESTIONS } from '../actions/questionsActions';

const initialState = {
  items: [],
  errors: null,
  loading: false,
  page: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_REQUEST_STARTED:
      return Object.assign({}, state, { loading: true, errors: null });
    case QUESTIONS_REQUEST_FINISHED:
      return {
        loading: false,
        errors: null,
        items: [
          ...state.items,
          ...action.payload.questions
        ],
        has_more: action.payload.has_more,
        page: action.payload.page
      };
    case CLEAR_QUESTIONS:
      return {
        loading: false,
        errors: null,
        items: [],
        has_more: false,
        page: 0
      };
    case QUESTIONS_REQUEST_ERROR:
      return Object.assign({}, state, { loading: false, errors: action.errors });
    default:
      return state;
  }
}
