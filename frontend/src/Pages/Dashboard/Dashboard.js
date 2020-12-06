import React from "react";
import {useHistory} from "react-router-dom";
import SearchCountry from "../CountryLookup/SearchCountry";

const Dashboard = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="px-3 container">
        <SearchCountry />
      </div>
    </>
  );
};

export default Dashboard;
