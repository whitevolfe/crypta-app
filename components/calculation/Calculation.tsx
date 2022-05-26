import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { OrderDeltaBox } from '../order/OrderDeltaBox';
import { dollarFormatter } from '../../utils/common';
import { Order as IOrder } from '../../types/Order';

interface IProp {
  order: IOrder;
}

export default function Calculation({ order }: IProp) {

  const [value, setValue] = React.useState<string>("");

  const logic = (value: number) => {
    if (value > order.amountBought) {
      return order.buyingPrice * order.amountBought;
    }
    return (100 + value / 100) * order.buyingPrice * order.amountBought;
  }

  //memo OrderDeltaBox
  const OrderDeltaBoxMemo = React.memo(OrderDeltaBox);

  return (
    <Card sx={{ width: '250px', height: '200px' }}>
      <CardContent>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField value={value} onChange={
            (e) => {
              setValue(e.target.value);
            }
          }
            type="number"
          />
        </Box>

        <OrderDeltaBoxMemo
          label={"total"}
          value={dollarFormatter(logic(Number(value)))}
        />
      </CardContent>

    </Card>
  );
}
