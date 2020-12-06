import React from 'react';

const ResultList = (props) => {
  return (
    <div className="px-3 mt-4 container">
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Population</th>
          <th>Currencies</th>
        </tr>
        </thead>
        <tbody>
        {props.list.map((country, countryIndex) => {
          return (
            <tr key={countryIndex}>
              <td>{country.name}</td>
              <td>{country.population}</td>
              <td>
                <table className="table">
                  <thead>
                  <tr>
                    <th width="40%">Name</th>
                    <th width="60%">Exchange Rate compared to SEK</th>
                  </tr>
                  </thead>
                  <tbody>
                  {country.currencies.map((currency, currencyIndex) => {
                    return (
                      <tr key={currencyIndex}>
                        <td>{currency.name}</td>
                        <td>{currency.rate || '-'}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </td>
            </tr>
        )
        })}
        </tbody>
        </table>
        </div>
        );
        };

        export default ResultList;
