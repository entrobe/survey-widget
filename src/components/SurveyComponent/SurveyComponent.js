import React, { useEffect, useState, useCallback } from "react";
import SurveySpinner from "./SurveySpinner/SurveySpinner";
import SurveyQuestion from "./SurveyQuestions/SurveyQuestion";
import SurveyStepper from "./SurveyStepper/SurveyStepper";
import StepDone from "./Steps/StepDone";

import "./SurveyComponent.css";

const SurveyComponent = (props) => {
  const { OrganizationID, surveyID, userID, apiUrl } = props;

  const [survey, setSurvey] = useState(null);
  const [steps, setSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAnswersAndQuestions = async (componentDidMount = false) => {
    setLoading(true);
    const surveyUri = `/survey?OrganizationID=${OrganizationID}&surveyID=${surveyID}`;
    const answerUri = `/answer?OrganizationID=${OrganizationID}&surveyID=${surveyID}&userID=${userID}`;

    const [survey, answer] = await Promise.all(
      [surveyUri, answerUri].map((uri) =>
        fetch(apiUrl + uri).then((res) => res.json())
      )
    );

    survey.questions = survey.questions.map((question) => {
      const isAnswered =
        answer.answers &&
        answer.answers.find((a) => a.questionID === question.id);

      return {
        ...question,
        isAnswered: Boolean(isAnswered),
      };
    });

    const answeredCount = survey.questions
      .map((question) => question.isAnswered)
      .filter(Boolean).length;

    if (componentDidMount && survey.questions.length === answeredCount) {
      setIsDone(true);
    }

    setSurvey(survey);
    setSteps(survey.questions.length);
    setCurrentStep(answeredCount);
    setLoading(false);
  };

  const fetchAnswersAndQuestionsCallback = useCallback(
    fetchAnswersAndQuestions
  );

  useEffect(() => {
    fetchAnswersAndQuestionsCallback(true);
  }, []);

  const questionSelect = ({ questionID, questionLabel }) => (answer) => {
    setLoading(true);
    const answerBody = {
      uid: userID,
      surveyID,
      OrganizationID,
      questionID,
      questionLabel,
      answer,
    };

    fetch(apiUrl + "/answer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerBody),
    })
      .then(() => fetchAnswersAndQuestionsCallback())
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={
        "survey-widget " +
        (isDone || currentStep === steps ? "survey-widget--completed" : "survey-widget--progress")
      }
    >
      {loading && <SurveySpinner />}
      {Boolean(survey) && currentStep !== steps && (
        <>
          <h4 className="survey-widget__title">{survey.title}</h4>
          {survey.questions.map((question, index) => (
            <div
              className={
                "survey-widget__question " +
                (index === currentStep ? "survey-widget__question--active" : "")
              }
              key={question.id}
            >
              {index === currentStep && (
                <>
                  <h5 className="survey-widget__question question__label">
                    {question.label}
                  </h5>
                  <SurveyQuestion
                    required={Boolean(question.required)}
                    type={question.type}
                    questionID={question.id}
                    options={question.options}
                    onSelect={questionSelect({
                      questionID: question.id,
                      questionLabel: question.label,
                    })}
                  />
                </>
              )}
            </div>
          ))}
          <SurveyStepper steps={steps} currentStep={currentStep} />
        </>
      )}
      {Boolean(survey) && (
        <>
          {currentStep === steps && !isDone && (
            <div className="survey-widget__message">Thank You</div>
          )}
          {isDone && <StepDone/>}
        </>
      )}
    </div>
  );
};

export default SurveyComponent;
