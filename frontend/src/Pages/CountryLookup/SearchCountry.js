import React, {useReducer, useState} from 'react';
import config from "../../config";
import ResultList from "./ResultList";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const Dashboard = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [countryResponse, setCountryResponse] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    fetch(`${config.baseUrl}/api/countries/${formData.keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false);
        if (res.success) {
          setCountryResponse(res.data.countries);
          setMessage(null);
        } else {
          setMessage({
            type: 'alert-danger',
            data: res.errorMessage,
          });
          setCountryResponse(null);
        }
      });
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className="px-3 mt-4 container">
      <h2 className="text-center">Search Country</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input type="text" name="keyword" onChange={handleChange} className="form-control"
                 aria-label="Text input with dropdown button"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary">Search</button>
          </div>
        </div>
      </form>
      {submitting &&
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-center" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }
      {message && (
        <div
          className={`alert fade show d-flex ${message.type}`}
          role="alert"
        >
          {message.data}
          <span
            aria-hidden="true"
            className="ml-auto cursor-pointer"
            onClick={() => setMessage(null)}
          >
              &times;
            </span>
        </div>
      )}
      {countryResponse &&
      <ResultList list={countryResponse}/>
      }
    </div>
  );
};

export default Dashboard;
