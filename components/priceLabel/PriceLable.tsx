import React from 'react'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material'

import { orderProfit, lableColor, orderProfitPercent, orderProfitPercentFormatted } from './Function'
import { Order as IOrder } from '../../types/Order'

type Props = {
  containerStyle?: React.CSSProperties,
  titleStyle?: SxProps,
  subtitleStyle?: SxProps,
  order: IOrder,
  currentPrice: number,
}

export default function PriceLable({ order, containerStyle, currentPrice, subtitleStyle, titleStyle }: Props) {

  const total = +order.amount * +order.price;

  const profit = orderProfit(order, currentPrice);
  const profitPercent = orderProfitPercent(order, currentPrice);
  const profitPercentFormatted = orderProfitPercentFormatted(order, currentPrice);
  const color = lableColor(profit);

  return (
    <div style={{ ...containerStyle }}>
      <Typography variant='subtitle1' sx={titleStyle}>{total}</Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant='subtitle2' sx={{ color, ...subtitleStyle }}>{profit}</Typography>
        {/** verticle divider  */}
        <div style={{ width: '2px', height: '20px', margin: "0px 5px", backgroundColor: '#ccc' }} />
        <Typography variant='subtitle2' sx={{ color, ...subtitleStyle }}>{profitPercentFormatted}</Typography>
      </div>
    </div>
  )
}
