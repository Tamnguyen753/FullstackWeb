import React, { useState } from "react";
import "./Register.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { extractMessageFromErr } from "../../utils/error";
import Input from "antd/es/input/Input";
import ErrorsMessage from "../../shared/components/ErrorMessages";

const schema = yup.object().shape({
  email: yup.string().required(),
  password:yup.string().required()
})

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {register} = useAuth();
  const onSubmit = async (data) => {
    try {
      register(data) 
    } catch (err) {
      toast.error(extractMessageFromErr(err))
    }
  }
  return (
    <div
      className="login"
      style={{
        backgroundImage: "url(/picture2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="box-login">
        <div className="content">
          <div className="header-login">
            <h1>Daftar TIX ID</h1>
            <h2>NAMA LENGKAP</h2>
          </div>
          <div className="content-login">
          <div>
          <Controller
            control={control}
            name="email"
            render={({field}) => (
              <Input 
              {...field} 
              status={"error.email" ? "error" : ""}  />)}>

            </Controller>
            {errors.email && <ErrorsMessage message={errors.email} />}
          </div>
            <div>
              <h2>NOMOR HANDPHONE</h2>
              <Controller
            control={control}
            name="password"
            render={({field}) => (
              <Input 
              {...field} 
              status={"error.password" ? "error" : ""}
              type="password"
              />)}>

            </Controller>
            {errors.password && <ErrorsMessage message={errors.password} />}
            </div>
            <Button
        className="submit"
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Sign in
      </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
