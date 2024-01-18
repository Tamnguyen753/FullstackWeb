import React from "react";
import "./Login.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { extractMessageFromErr } from "../../utils/error";
import Input from "antd/es/input/Input";
import ErrorsMessage from "../../shared/components/ErrorMessages";
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();
  const onSubmit = async (data) => {
    try {
      login(data)
    } catch (err) {
      toast.error(extractMessageFromErr(err))
    }
  }




  return (
    <div
      className="login"
      style={{
        backgroundImage: "url(/picture.png)",
      }}
    >
      <div className="box-login">
        <div className="content">
          <div className="header-login">
            <h1>Masuk ke TIX ID</h1>
          </div>
          <div className="content-login">
            <div >
              <h2>Username</h2>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    {...field}
                    status={"error.username" ? "error" : ""} />)}>

              </Controller>
              {errors.username && <ErrorsMessage message={errors.username} />}

            </div>
            <div >
              <h2>Password</h2>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    status={"error.password" ? "error" : ""}
                    type="password"
                  />)}>

              </Controller>
              {errors.password && <ErrorsMessage message={errors.password} />}
            </div>
          </div>
          <div className="btn">
            <Button
              className="submit"
              type="primary"
              onClick={handleSubmit(onSubmit)}

            >
              Sign in
            </Button>
            <Link to="/register">
              <Button className="btn-signup">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
