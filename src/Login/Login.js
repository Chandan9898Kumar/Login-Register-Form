import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
const LoginPage = ({ setUserValidate }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    let payload = {
      email,
      password,
    };
    axios
      .post('/api/login', payload)
      .then((response) => {
        console.log(response,'response')
        setIsSubmitting(false);
        setUserValidate(true)
        setValidationErrors('')
        // From this navigation we are going Route '/' which is  base Route where our protected routes are defined on that route if condition is true then we will go dashboard else redirect to login.
        navigate('/')
      })
      .catch((error) => {
        console.log(error,'error')
        setIsSubmitting(false);
        if (error.response.data.errors != undefined) {
          setValidationErrors(error.response.data.errors);
        }
        if (error.response.data.error != undefined) {
          setValidationErrors(error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="mainContent">
        <form className="formStyle" onSubmit={handleSubmit}>
          <div
            className="signIn"
            style={{ color: 'blue', marginBottom: '10px' }}
          >
            SignIn.
          </div>
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style={{ fontSize: 'larger' }}
            >
              Email address
            </label>
            <input
              required
              autoCorrect={true}
              autoComplete={true}
              autoFocus={true}
              placeholder="Email address"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) => setEmail(event.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
            {Boolean(validationErrors) && (
            <div style={{ color: 'red', width: 'max-content' }}>
              {validationErrors}
            </div>
          )}
          </div>
          <div class="mb-3">
            <label
              for="exampleInputPassword1"
              class="form-label"
              style={{ fontSize: 'larger' }}
            >
              Password
            </label>
            <input
              required
              placeholder="Password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
            Login
          </button>

          <div class="mb-3 form-check" style={{ marginTop: '20px' }}>
            <label class="form-check-label" for="exampleCheck1">
              Don't have account ? <Link to="/register">Register Here</Link>
            </label>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
