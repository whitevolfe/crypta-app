import { FunctionComponent, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import dynamic from 'next/dynamic'


import { Order } from "../../types/Order";
import { dollarFormatter, timeAgoFormat } from "../../utils/common";
import { OrderRowBox } from "./OrderRowBox";
import { OrderDeltaBox } from "./OrderDeltaBox";
import { Button } from "@mui/material";
import Dots from "./Threedots";

interface Props {
  order: Order;
  tradingPair: string;
}

export const OrderRow: FunctionComponent<Props> = ({ order, tradingPair }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={11}>
          <Typography gutterBottom variant="subtitle1" component="div">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "green" }}>B</Avatar>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ color: "primary.contrastText" }}
              >
                {timeAgoFormat(new Date(order.createdDate))}
              </Typography>
            </Stack>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Dots order={order} />
        </Grid>
        <Grid item xs={4}>
          <OrderRowBox
            label={"Buy Price"}
            value={dollarFormatter(order.buyingPrice)}
          />
        </Grid>
        <Grid item xs={4}>
          <OrderRowBox label={"Trading Pair"} value={tradingPair} />
        </Grid>
        <Grid item xs={4}>
          <OrderRowBox label={"Amount Bought"} value={order.amountBought} />
        </Grid>

        <Grid item xs={4}>
          <OrderRowBox
            label={"Cost (incl.fee)"}
            value={dollarFormatter(order.totalPrice)}
          />
        </Grid>
        <Grid item xs={4}>
          <OrderRowBox
            label={"Worth"}
            value={dollarFormatter(order.currentWorth)}
          />
        </Grid>
        <Grid item xs={4}>
          <OrderDeltaBox
            label={"Delta"}
            value={dollarFormatter(order.currentWorth - order.totalPrice)}
          />
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </>
  );
};
