import { Box } from "@mui/material";
import React from "react";
import CustomizedCard from "../common/card";
import CircleIcon from "@mui/icons-material/Circle";
import SignUpForm from "./Form";

const SignUpComponent = () => {
  return (
    <Box
      sx={{
        margin: "auto",
      }}
    >
      <CustomizedCard
        heading="Signup"
        rightIcon={
          <>
            <CircleIcon sx={{ color: "green" }} />
            <CircleIcon sx={{ color: "blue" }} />
            <CircleIcon sx={{ color: "red" }} />
          </>
        }
        cardContent={<SignUpForm />}
        minWidth="350px"
      />
    </Box>
  );
};

export default SignUpComponent;
