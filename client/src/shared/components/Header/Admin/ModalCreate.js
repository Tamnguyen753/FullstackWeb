import { Button, Input } from "antd";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorsMessage from "../../ErrorMessages";
import { toast } from "react-toastify";
import { extractMessageFromErr } from "../../../../utils/error";
// import { requestWithToken } from "../../../../utils/axios-http";
import useAdmin from "../../../../hooks/useAdmin";

const schema = yup.object().shape({
  name: yup.string(),
  image: yup.string(),
  director:yup.string(),
  actor:yup.string(),
  tag:yup.string(),
  duration:yup.string(),
  launch:yup.string(),
  language:yup.string(),
  rating:yup.string(),
  trailer:yup.string(),
  des:yup.string()
});

const ModalCreate = ({close}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const onSubmit = async (data) => {
  //   try {
  //     await requestWithToken({
  //       url: "/movie",
  //       method: "post",
  //       data,
  //     });
  //     console.log(data);
  //     toast.success("create success");
  //     close();
  //   } catch (err) {
  //     toast.error(extractMessageFromErr(err));
  //     console.log(err);
  //   }
  // };
  const {createMovie} = useAdmin()
  const onSubmit = async (data) => {
    try {
      createMovie(data) 
      close()
    } catch (err) {
      toast.error(extractMessageFromErr(err))
    }
  }
  const onLog = () => {
    console.log('abc');
  }
  return (
    <div>
      <div className="form-item">
        <span>name</span>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input {...field} status={errors.name ? "error" : ""} />
          )}
        />
        {errors.name && <ErrorsMessage message={errors.name} />}
      </div>
      <div className="form-item">
        <span>image</span>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <Input {...field} status={errors.image ? "error" : ""} />
          )}
        />
        {errors.image && <ErrorsMessage message={errors.image} />}
      </div>
      <div className="form-item">
        <span>director</span>
        <Controller
          control={control}
          name="director"
          render={({ field }) => (
            <Input {...field} status={errors.director ? "error" : ""} />
          )}
        />
      </div>
      <div className="form-item">
        <span>actor</span>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input {...field} status={errors.actor ? "error" : ""} />
          )}
        />
        {errors.actor && <ErrorsMessage message={errors.actor} />}
      </div>
      <div className="form-item">
        <span>tag</span>
        <Controller
          control={control}
          name="tag"
          render={({ field }) => (
            <Input {...field} status={errors.tag ? "error" : ""} />
          )}
        />
        {errors.tag && <ErrorsMessage message={errors.tag} />}
      </div>
      <div className="form-item">
        <span>duration</span>
        <Controller
          control={control}
          name="duration"
          render={({ field }) => (
            <Input {...field} status={errors.duration ? "error" : ""} />
          )}
        />
      </div>
      <div className="form-item">
        <span>launch</span>
        <Controller
          control={control}
          name="launch"
          render={({ field }) => (
            <Input {...field} status={errors.launch ? "error" : ""} />
          )}
        />
        {errors.launch && <ErrorsMessage message={errors.launch} />}
      </div>
      <div className="form-item">
        <span>language</span>
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <Input {...field} status={errors.language ? "error" : ""} />
          )}
        />
        {errors.language && <ErrorsMessage message={errors.language} />}
      </div>
      <div className="form-item">
        <span>rating</span>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <Input {...field} status={errors.rating ? "error" : ""} />
          )}
        />
      </div>
      <div className="form-item">
        <span>trailer</span>
        <Controller
          control={control}
          name="trailer"
          render={({ field }) => (
            <Input {...field} status={errors.trailer ? "error" : ""} />
          )}
        />
        {errors.trailer && <ErrorsMessage message={errors.trailer} />}
      </div>
      <div className="form-item">
        <span>des</span>
        <Controller
          control={control}
          name="des"
          render={({ field }) => (
            <Input {...field} status={errors.des ? "error" : ""} />
          )}
        />
        {errors.des && <ErrorsMessage message={errors.des} />}
      </div>
      <Button type="primary" size="large" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </div>
  );
};
export default ModalCreate;
