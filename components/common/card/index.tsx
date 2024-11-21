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
    <Card sx={{ minWidth: {sm:'100%',md:minWidth}, width: {xs:'100%',sm:minWidth}, border: "1px solid brown",margin:{md:'auto'} }}>
      <Box
        sx={{
          padding: "10px",
          backGround: "#fcd0b4",
          display: "flex",
          fontWeight: 600,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid brown",
          textTransform: "capitalize",
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
