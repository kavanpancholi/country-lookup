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
        {props.response.countries.map((country, countryIndex) => {
          return (
            <tr key={countryIndex}>
              <td>{country.name}</td>
              <td>{country.population}</td>
              <td>
                {country.currencies.map((currency) => {
                  return (
                    <dl className="dl-horizontal">
                      <dt>Currency</dt>
                      <dd>{currency.name}</dd>
                      <dt>Exchange Rate compared to {props.response.baseCurrency}</dt>
                      <dd>{currency.rate || '-'}</dd>
                      {currency.rate &&
                        <>
                        <dt>{props.response.baseAmount} {props.response.baseCurrency} in {currency.code}</dt>
                        <dd>{currency.symbol} {currency.amount}</dd>
                        </>
                      }
                    </dl>
                  )
                })}
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
