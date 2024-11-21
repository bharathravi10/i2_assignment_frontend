import { InputLabel, TextField } from "@mui/material";
import React from "react";

interface ICustomizedInputProps {
  label: string;
  htmlFor: string;
  id: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | boolean;
  placeholder?: string 
}

const CustomizedInput: React.FC<ICustomizedInputProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <>
      <InputLabel htmlFor={props.id}>{label}</InputLabel>
      <TextField
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        error={error}
        helperText={helperText}
        placeholder={props.placeholder}
        sx={{
          width: "100%",
          marginBottom: "10px",
          "& .MuiInputBase-input.MuiOutlinedInput-input": {
            fontSize: { xs: "12px", md: "14px" },
            fontWeight: "500",
            padding: { xs: "8px 10px" },
            border: "1px solid brown",
            background: "#F2F2F2",
            color: "#192b69",
            borderRadius: "10px",
            maxWidth: "100%",
            width: "100%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
          "& fieldset": {
            border: "1px solid brown",
            borderRadius: "10px",
            width: "100%",
          },
        }}
      />
    </>
  );
};

export default CustomizedInput;
