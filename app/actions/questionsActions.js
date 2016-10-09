export const QUESTIONS_REQUEST_STARTED = 'QUESTIONS_REQUEST_STARTED';
export const QUESTIONS_REQUEST_FINISHED = 'QUESTIONS_REQUEST_FINISHED';
export const QUESTIONS_REQUEST_ERROR = 'QUESTIONS_REQUEST_ERROR';

function questionsRequestStarted() {
  return { type: QUESTIONS_REQUEST_STARTED };
}

function questionRequestFinished(time) {
  return { type: QUESTIONS_REQUEST_FINISHED, time };
}

function questionsRequestError(errors) {
  return { type: QUESTIONS_REQUEST_ERROR, errors };
}

export function questionsRequest() {
  return (dispatch) => {
    dispatch(questionsRequestStarted());

    return setTimeout(() => dispatch(questionRequestFinished(Date.now()), 1000)); // Изображаем network latency :)
  };
}