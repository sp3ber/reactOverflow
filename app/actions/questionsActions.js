import axios from 'axios';
import { API_URL, PAGE_SIZE } from '../constants/api';

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

export function questionsRequest(title, current_page = 0, page_size = PAGE_SIZE) {
  return (dispatch) => {
    dispatch(questionsRequestStarted());
    return axios(`${API_URL}/questions?`, {
      params: {
        title,
        current_page,
        page_size
      }
    })
      .then((response)=>(
        dispatch(questionRequestFinished({
          questions: response.data.items,
          has_more: response.data.has_more,
          current_page
        }))
      ))
      .catch((err)=>(
        dispatch(questionsRequestError(err))
      ))
  };
}