import { Card, Typography } from "@mui/material";
import React from "react";

interface CustomProps {
  cardColor?: string;
  cardWidth?: string;
  cardHeight?: string;
  color?: string;
  icon?: string;
  title: string;
  count: number;
  onClick?: Function;
}

export default function CustomCard(props: CustomProps) {
  return (
    <>
      <Card
        //   onClick={() => props.onClick && props.onClick()}
        sx={{
          width: props.cardWidth ? props.cardWidth : "auto",
          height: props.cardHeight ? props.cardHeight : "auto",
          backgroundColor: props.cardColor ? props.cardColor : "#FFFFFF",
          // color: props?.color ? props?.color : "#FFFFFF",
          flexDirection: "column",
          padding: 1,
          //   ...centerItemFlex,
          cursor: "pointer",
          "&:hover": {
            boxShadow:
              "0 1px 2px -2px rgb(0 0 0 /16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          },
        }}
      >
        {/* <img src={props?.icon} alt={props.title} width={50} height={50} /> */}
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="h4">{props.count}</Typography>
      </Card>
    </>
  );
}
