import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

import "./login.css";

const Login = () => {
  const { signInUsingGoogle, signInUsingEmailAndPassword } = useAuth();

  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || "/home";

  const handleGoogleSignIn = () => {
    signInUsingGoogle().then(() => {
      history.push(redirect_uri);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    // createNewAccount(data.email, data.password, data.name);
    signInUsingEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input placeholder="Enter Your Name" {...register("name")} /> */}
        <input placeholder="Enter Your Email" {...register("email")} />
        <input
          placeholder="Enter Your Password"
          {...register("password", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input type="submit" />
      </form>
      <div>--------------Or--------------</div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
};

export default Login;
