import React from "react";


const SurveySelectQuestion = (props) => {
  const { options, questionID, onSelect } = props;

  return (
    <div className="survey-widget__question-wrapper survey-widget__select-wrapper">
      <select
        className="survey-widget__select"
        name={questionID}
        defaultValue="survey-widget-placeholder"
        onChange={(event) => onSelect(event.target.value)}
      >
        <option disabled value="survey-widget-placeholder">Please select the answer</option>
        {options.map((option, index) => (
          <option
            key={index}
            className="survey-widget__option"
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SurveySelectQuestion;
