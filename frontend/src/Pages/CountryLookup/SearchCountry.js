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
  const [formData, setFormData] = useReducer(formReducer, {
    baseCurrency: "SEK"
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [countryResponse, setCountryResponse] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    if (formData.keyword) {
      setSubmitting(true);
      const params = {baseCurrency: formData.baseCurrency};
      fetch(`${config.baseUrl}/api/countries/${formData.keyword}?${new URLSearchParams(params)}`, {
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
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className="px-3 mt-4 container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h2 className="text-center">Search Country</h2>
          </div>
          <div className="col-3 text-right my-auto">
            <label htmlFor="baseCurrency" className="mr-2">Base Currency:</label>
            <select name="baseCurrency" defaultValue="SEK" onChange={handleChange}>
              {config.baseCurrencies.map((currency, currencyIndex) => {
                return (
                  <option key={currencyIndex} value={currency}>{currency}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="text" name="keyword" placeholder="Enter keyword to lookup Country" onChange={handleChange}
                 className="form-control"
                 aria-label="Text input with dropdown button"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" disabled={!formData.baseCurrency}>Search</button>
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
