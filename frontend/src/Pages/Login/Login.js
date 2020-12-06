import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";

import styles from "./Login.module.css";

import {useForm} from "react-hook-form";
import config from "../../config";

const Login = () => {
  const {register, handleSubmit, errors} = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
    fetch(`${config.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setMessage({
            data: "Logged in successfully, redirecting...",
            type: "alert-success",
          });
          setTimeout(() => {
            localStorage.setItem("token", res.data.token);
            history.push("/dashboard");
          }, 500);
          e.target.reset();
        } else {
          setMessage({
            data: res.errorMessage,
            type: 'alert-danger',
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div
      className={`container-fluid d-flex align-items-center justify-content-center h-100vh`}
    >
      <div className={styles.loginFormContainer}>
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
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login Form
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>

              <button className="btn btn-link ml-auto">
                <Link to="/register">New User</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
