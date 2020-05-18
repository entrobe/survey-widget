import React, { useState } from "react";

const SurveyRadioQuestion = (props) => {
  const { questionID, onSelect, required } = props;

  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const onClickHandler = () => {
    if(required && answer.length === 0){
      setError(true);
      return;
    }

    return onSelect(answer)
  }

  const onInputHandler = (event) => {
    if(error){
      setError(false);
    }

    setAnswer(event.target.value)
  }

  return (
    <div className="survey-widget__question-wrapper survey-widget__text-wrapper">
      <textarea
        className={`survey-widget__textarea ${error ? 'survey-widget__textarea--error' : ''}`}
        resize="none"
        id={questionID}
        name={questionID}
        onChange={onInputHandler}
        value={answer}
      />
      <button className="survey-widget__button" onClick={onClickHandler}>Next</button>
    </div>
  );
};

export default SurveyRadioQuestion;
