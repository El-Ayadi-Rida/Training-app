import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
// import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setTokens } from 'auth/authSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { setCurrentUser } from 'auth/authSlice';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const title = 'Login';
  const description = 'Login Page';
  // const { currentUser, isLogin } = useSelector((state) => state.auth);
  // useEffect(() => {
    
  // }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });
  const getuserFromToken = () => {
    const token = localStorage.getItem('token'); // or sessionStorage, depending on where you store your token
    if (token) {
      const decoded = jwtDecode(token);
      const user = {...decoded , role:"admin"}
      console.log(user);
      return user; // Make sure the payload contains the 'role' you set on the server side
    }
    return {};
  };
  const initialValues = { email: '', password: '' };
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  console.log(currentUser);
  // const onSubmit = async (values) => {
  //   console.log('submit form', values);
  //   const response = await fetch('https://localhost:7202/api/User/Login', {
  //     method: 'post',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   });
    
  //   const resJson = await response?.json();
    
  //   const { token } = resJson;
  //   await localStorage.setItem('jwt-token', JSON.stringify(token));
  //   history.push('/app');
  //   window.location.reload();
  // };
  const onSubmit = async (values) => {
    try {
      // const response = await axios.post('http://localhost:8080/api/auth/signin', values);
      const response = await axios.post('http://localhost:8080/api/auth/signin', {usernameOrEmail:values.email , password:values.password});
      const { accessToken, refreshToken } = response.data;

      // Store { accessToken, refreshToken } in localStorage; 

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Dispatch action to save tokens
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setCurrentUser(getuserFromToken()));
  
      console.log('Login successful', response.data);
      history.push('/app');
    } catch (error) {
      console.error('Login error', error.response);
    }
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Multiple Niches</h1>
            <h1 className="display-3 text-white">Ready for Your Project</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before
            process-centric communities...
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please <NavLink to="/register">register</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
