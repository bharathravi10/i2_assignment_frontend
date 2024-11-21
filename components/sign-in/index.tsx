import { Box } from "@mui/material";
import React from "react";
import CustomizedCard from "../common/card";
import CircleIcon from "@mui/icons-material/Circle";
import SignInform from "./Form";

const SignInComponent = () => {
  return (
    <Box>
      <CustomizedCard
        heading="Login"
        rightIcon={
          <>
            <CircleIcon sx={{ color: "green" }} />
            <CircleIcon sx={{ color: "blue" }} />
            <CircleIcon sx={{ color: "red" }} />
          </>
        }
        cardContent={<SignInform />}
        minWidth="350px"
      />
    </Box>
  );
};

export default SignInComponent;
