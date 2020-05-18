import React, { useState } from "react";
import SurveyComponent from "../../components/SurveyComponent/SurveyComponent";
import "./Home.css";

const OrganizationID = "F824Bb7abtQpvv07kjrX";
const surveyID = "qpSogKlTVVQSTgJ5Aakb";
const userID = "1wewd9asdasdnas9as";
const apiUrl = process.env.REACT_APP_FIREBASE_API_URL;
const apiKey = 67890;

const Home = () => {
  const [loading, setLoading] = useState(false);

  function refreshWidget() {
    setLoading(true);
    const uri = `/answer?OrganizationID=${OrganizationID}&surveyID=${surveyID}&userID=${userID}`;
    fetch(apiUrl + uri, { 
      method: "DELETE",
      headers: {
        'X-API-KEY': apiKey
      }
     }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Page with survey</h1>
      <p
        onClick={refreshWidget}
        style={{ cursor: "pointer", "textDecoration": "underline" }}
      >
        Click to refresh widget state
      </p>
      {!loading && (
        <div className="home__wrapper">
          <SurveyComponent
            OrganizationID={OrganizationID}
            surveyID={surveyID}
            userID={userID}
            apiUrl={apiUrl}
            headers={{
              'X-API-KEY': apiKey
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
