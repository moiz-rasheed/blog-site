import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Container, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container>
      <div className="flex mt-20 items-center justify-center w-full font-poppins text-[#1c1d20]">
        <div className={`mx-auto w-full max-w-md`}>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-28">
              <Logo />
            </span>
          </div>
          <p className="text-center mt-3 text-lg leading-tight">
            Welcome, Please login
          </p>
          {error && <p className="text-red-600 text-center mt-8">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-6">
            <div>
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className="mb-3"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <p className="mt-2 mb-6 text-center text-base font-light">
                Don&apos;t have an account?&nbsp;
                <Link
                  to="/signup"
                  className="font-semibold transition-all duration-200 hover:underline underline-offset-2"
                >
                  SIGN UP
                </Link>
              </p>
              <Button type="submit" className="w-full">
                LOGIN
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
