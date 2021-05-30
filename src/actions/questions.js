import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(text) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
        author: authedUser,  
        optionOneText: text.optionOneText,
        optionTwoText: text.optionTwoText
    
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addAnswer({ qid, authedUser, answer}) {
  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer
  };
}

export function handleAddAnswer({answer, qid}) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
  
      dispatch(showLoading());
  
      return saveQuestionAnswer({
        authedUser,  
        qid,
        answer
      
      })
        .then(() => dispatch(addAnswer({qid, authedUser, answer})))
        .then(() => dispatch(hideLoading()));
    };
  }