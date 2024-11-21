"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import CustomizedInput from "../common/input-field";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { userSignIn } from "@/utils/api";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "@/store/slice/auth";
import { setSession } from "@/context/JwtContext";
import { showSnackbar } from "@/store/snackbarSlice";

const SignInform = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Initial values for the form
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      try {
        const res = await userSignIn(values.email, values.password);

        if (res.success) {
          dispatch(userLoginSuccess(res.payload));
          setSession(res.access_token || null);
        } else {
         dispatch( showSnackbar({
          message: "credentials are invalid",
          severity: "error",
        }))
        }
      } catch (error) {
        dispatch(showSnackbar({
          message: "credentials are invalid",
          severity: "error",
        }));
        Promise.reject(error)
      }
    },
  });
  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography>Login</Typography>
      </Box>
      <Box component="form" onSubmit={formik.handleSubmit}>
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
                background: "#fcd0b4",
                borderRadius: "10px",
                color: "#192b69",
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{
                padding: "6px 20px !important",
                background: "skyblue",
                borderRadius: "10px",
                color: "#192b69",
              }}
              onClick={() => router.push("/sign-up")}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignInform;
