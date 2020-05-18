import React from 'react';
import SurveyRadioQuestion from "./SurveyRadioQuestion";
import SurveySelectQuestion from "./SurveySelectQuestion";
import SurveyTextQuestion from "./SurveyTextQuestion";

const questionStrategy = {
    'radio': SurveyRadioQuestion,
    'select': SurveySelectQuestion,
    'text': SurveyTextQuestion,
}

const SurveyQuestion = (props) => {
    const {type, ...questiopnProps} = props;
    const Question = questionStrategy[type] || SurveyRadioQuestion;

    return <Question {...questiopnProps}/>
}

export default SurveyQuestion;