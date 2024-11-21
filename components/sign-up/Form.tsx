"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import CustomizedInput from "../common/input-field";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/snackbarSlice";
import { postUser } from "@/utils/api";
import { SignUpConstants } from "./signUp-const";
import { SigninConstants } from "../sign-in/signIn-const";
import { AddNotesConstants } from "../notes/notes-constants";

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .nullable(),
  });

  // Initial values for the form
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the POST request
        const response = await postUser(
          values.name,
          values.email,
          values.password
        );

        if (response?.data.status === false) {
          dispatch(
            showSnackbar({
              message: response?.data.message,
              severity: "error",
            })
          );
        }

        if (response?.data.status === true) {
          dispatch(
            showSnackbar({
              message: SignUpConstants.SUCCESS_MSG,
              severity: "success",
            })
          );
          router.push("/sign-in");
        }
      } catch (error) {
        dispatch(
          showSnackbar({
            message: AddNotesConstants.FAILURE_MSG,
            severity: "error",
          })
        );
        Promise.reject(error)
      }
    },
  });
  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography>{SignUpConstants.TITLE}</Typography>
      </Box>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CustomizedInput
          label="Name"
          htmlFor="name"
          id="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <CustomizedInput
          label="Email"
          htmlFor="email"
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <CustomizedInput
          label="Password"
          htmlFor="password"
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <CustomizedInput
          label="Confirm Password"
          htmlFor="confirmPassword"
          id="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              sx={{
                padding: "6px 20px !important",
                background: "#28f028",
                borderRadius: "10px",
                color: "#192b69",
              }}
            >
              {SigninConstants.REGISTER}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{
                padding: "6px 20px !important",
                background: "#fcd0b4",
                borderRadius: "10px",
                color: "#192b69",
              }}
              onClick={() => router.push("/sign-in")}
            >
              {SigninConstants.TITLE}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignUpForm;
