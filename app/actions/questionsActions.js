import axios from 'axios';
import { API_URL } from '../constants/api';

export const QUESTIONS_REQUEST_STARTED = 'QUESTIONS_REQUEST_STARTED';
export const QUESTIONS_REQUEST_FINISHED = 'QUESTIONS_REQUEST_FINISHED';
export const QUESTIONS_REQUEST_ERROR = 'QUESTIONS_REQUEST_ERROR';

function questionsRequestStarted() {
  return { type: QUESTIONS_REQUEST_STARTED };
}

function questionRequestFinished(questions) {
  return { type: QUESTIONS_REQUEST_FINISHED, questions };
}

function questionsRequestError(errors) {
  return { type: QUESTIONS_REQUEST_ERROR, errors };
}

export function questionsRequest(title) {
  return (dispatch) => {
    dispatch(questionsRequestStarted());
    return axios(`${API_URL}/questions`, {
      params: {
        title
      }
    })
  };
}