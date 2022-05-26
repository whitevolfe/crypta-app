import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "../../types/Product";
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
import { formatDistance } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { dollarFormatter } from "../../utils/common";

interface Props {
  product: Product;
}

export const Label: FunctionComponent<Props> = ({ product }) => {
  const { image, name, description, postedAt } = product.coinDetails;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 140 }}>
        <Link href="https://www.kinit.lk/">
          <Typography
            sx={{ color: "text.secondary" }}
            variant="subtitle2"
            noWrap
          >
            {name}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          <Tooltip title="Amount Bought">
            <span>{dollarFormatter(product.amountBought)}</span>
          </Tooltip>{" "}
          |
          <Tooltip title="Buying Price">
            <span>{dollarFormatter(product.buyingPrice)}</span>
          </Tooltip>
          |
          <Tooltip title="Exchange Fee">
            <span>{dollarFormatter(product.exchangeFee)}</span>
          </Tooltip>
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {/* {formatDistance(product.createdDate, new Date())} */}
      </Typography>
    </Stack>
  );
};
