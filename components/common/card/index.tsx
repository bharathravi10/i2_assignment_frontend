import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface ICustomizedCardProps {
  heading: string;
  rightIcon: React.ReactElement;
  cardContent: React.ReactElement;
  minWidth: string;
}
const CustomizedCard: React.FC<ICustomizedCardProps> = ({
  heading,
  rightIcon,
  cardContent,
  minWidth,
}) => {
  return (
    <Card sx={{ minWidth: minWidth, width: "100%", border: "1px solid brown" }}>
      <Box
        sx={{
          padding: "10px",
          backGround: "#fcd0b4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid brown",
        }}
      >
        <Typography>{heading}</Typography>
        <Box>{rightIcon}</Box>
      </Box>
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
};

export default CustomizedCard;
