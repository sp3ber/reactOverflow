import axios from 'axios';
import { API_URL, PAGE_SIZE } from '../constants/api';
import { searchQueryName } from '../constants/routes';

export const QUESTIONS_REQUEST_STARTED = 'QUESTIONS_REQUEST_STARTED';
export const QUESTIONS_REQUEST_FINISHED = 'QUESTIONS_REQUEST_FINISHED';
export const QUESTIONS_REQUEST_ERROR = 'QUESTIONS_REQUEST_ERROR';
export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';

function questionsRequestStarted() {
  return { type: QUESTIONS_REQUEST_STARTED };
}

function questionRequestFinished(payload) {
  return { type: QUESTIONS_REQUEST_FINISHED, payload };
}

function questionsRequestError(error) {
  return { type: QUESTIONS_REQUEST_ERROR, error };
}

export function questionsRequest(q, page, pagesize = PAGE_SIZE) {
  return (dispatch, getState) => {
    const pageToLoad = page ? getState().questions.page + 1 : 1;
    dispatch(questionsRequestStarted());
    return axios(`${API_URL}/questions?`, {
      params: {
        [searchQueryName]: q,
        page: pageToLoad,
        pagesize
      }
    })
      .then((response) => (
        dispatch(questionRequestFinished({
          questions: response.data.items,
          has_more: response.data.has_more,
          page: pageToLoad
        }))
      ))
      .catch((err) => (
        dispatch(questionsRequestError(err))
      ));
  };
}

export function clearQuestions() {
  return { type: CLEAR_QUESTIONS };
}
