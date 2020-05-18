import React from "react";

const SurveyRadioQuestion = (props) => {
  const { options, questionID, onSelect } = props;

  return (
    <div className="survey-widget__question-wrapper survey-widget__radio-wrapper">
      {options.map((option, index) => (
        <p key={index} className="survey-widget__radiobutton-wrapper">
          <input
            className="survey-widget__radiobutton"
            type="radio"
            id={questionID + index}
            name={questionID}
            value={option}
            onChange={(event) => onSelect(event.target.value)}
          />
          <label htmlFor={questionID + index}>{option}</label>
        </p>
      ))}
    </div>
  );
};

export default SurveyRadioQuestion;
