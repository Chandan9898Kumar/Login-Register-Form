import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterForm = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    let payload = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    axios
      .post('/api/register', payload)
      .then((Response) => {
        setIsSubmitting(false);
        //  we can use localStorage here to store user information by simply passing payload inside localStorage and later for login purpose we get these details from localStorage and validate if user has typed correct data or not.
        //  For this project we are using axios api and localStorage, just for practice we used localStorage.
        localStorage.setItem(
          'validation',
          JSON.stringify({ data: Response.data, pass: password })
        );
        //  Note :  When the user successfully registered then we are redirecting user to login page where user have to put their registered credentials.
        //  we can also redirect user directly to Dashboard by doing navigate('/').
        navigate('/login');

        // form api we can get token for validation and while logging we can match if token is correct or not which is coming from api.
        // localStorage.setItem('token', Response.data.token)
      })
      .catch((error) => {
        console.log(error, 'data');
        setIsSubmitting(false);
        if (error.response.data.errors != undefined) {
          setValidationErrors(error.response.data.errors);
        }
      });
  };

  return (
    <div className="mainContent">
      <form className="formStyle" onSubmit={handleRegisterForm}>
        <div className="signIn" style={{ color: 'blue', marginBottom: '10px' }}>
          Register.
        </div>
        <div class="mb-3">
          <label
            for="exampleInputEmail1"
            class="form-label"
            style={{ fontSize: 'larger' }}
          >
            Name
          </label>
          <input
            required
            autoCorrect={true}
            autoComplete={true}
            autoFocus={true}
            placeholder="Name"
            type="text"
            class="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <label
            for="exampleInputEmail1"
            class="form-label"
            style={{ fontSize: 'larger' }}
          >
            Email Address
          </label>
          <input
            required
            autoCorrect={true}
            autoComplete={true}
            placeholder="Email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => setEmail(event.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
          {Boolean(validationErrors.email) && (
            <div style={{ color: 'red', width: 'max-content' }}>
              {validationErrors.email[0]}
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
            id="exampleInputPassword"
            onChange={(event) => setPassword(event.target.value)}
          />
          {validationErrors.password &&
            validationErrors.password.length > 0 &&
            ((validationErrors.password.length === 1 &&
              !validationErrors.password[0].includes('does not match')) ||
              (validationErrors.password.length === 2 &&
                !validationErrors.password[1].includes('does not match'))) && (
              <div style={{ color: 'red', width: 'max-content' }}>
                The password must be at least 8 characters.
              </div>
            )}
        </div>
        <div class="mb-3">
          <label
            for="exampleInputPassword1"
            class="form-label"
            style={{ fontSize: 'larger' }}
          >
            Confirm Password
          </label>
          <input
            required
            placeholder="Password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {validationErrors.password &&
            validationErrors.password.length > 0 &&
            ((validationErrors.password.length === 1 &&
              validationErrors.password[0].includes('does not match')) ||
              (validationErrors.password.length === 2 &&
                validationErrors.password[1].includes('does not match'))) && (
              <div style={{ color: 'red', width: 'max-content' }}>
                The password confirmation does not match.
              </div>
            )}
        </div>
        <button disabled={isSubmitting} type="submit" class="btn btn-primary">
          Register Account
        </button>

        <div class="mb-3 form-check" style={{ marginTop: '20px' }}>
          <label class="form-check-label" for="exampleCheck1">
            Have already an account ? <Link to="/login">Login</Link>
          </label>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
