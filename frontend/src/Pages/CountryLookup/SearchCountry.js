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
    baseCurrency: "SEK",
    baseAmount: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [countryResponse, setCountryResponse] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    if (formData.keyword) {
      setSubmitting(true);
      const params = {baseCurrency: formData.baseCurrency, baseAmount: formData.baseAmount};
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
            setCountryResponse(res.data);
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
        <h2 className="text-center">Search Country</h2>
        <div className="row mt-4">
          <div className="col">
            <label htmlFor="baseCurrency" className="mr-2">Base Currency:</label>
            <select name="baseCurrency" defaultValue="SEK" onChange={handleChange}>
              {config.baseCurrencies.map((currency, currencyIndex) => {
                return (
                  <option key={currencyIndex} value={currency}>{currency}</option>
                )
              })}
            </select>
          </div>
          <div className="col">
            <label htmlFor="baseAmount" className="mr-2">Base Amount:</label>
            <input type="number" min="1" name="baseAmount" defaultValue="1" onChange={handleChange} />
          </div>
        </div>
        <div className="input-group mb-3 mt-4">
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
      <ResultList response={countryResponse}/>
      }
    </div>
  );
};

export default Dashboard;
