import React, {useState} from "react";

const SurveyRadioQuestion = (props) => {
    const { question, onSelect } = props;
    const [answer, setAnswer] = useState();

  return (
    <div className="survey-widget__question-wrapper survey-widget__radio-wrapper">
        <textarea resize="none" id={question.id} name={question.id} onInput={setAnswer}>{answer}</textarea>
        <button onClick={onSelect(answer)}>Next</button>
    </div>
  );
};

export default SurveyRadioQuestion;
