import { Order } from "../../types/Order";

export const orderProfit = (order: Order, currentPrice): number => {
  return +order.amount * (+order.price - currentPrice);
};

export const orderProfitPercent = (order: Order, currentPrice): number => {
  return (+order.amount * (+order.price - currentPrice)) / +order.price;
};

export const orderProfitPercentFormatted = (order: Order, currentPrice): string => {
  return `${(orderProfitPercent(order, currentPrice) * 100).toFixed(2)}%`;
};

export const lableColor = (orderProfit: number): string => {
  return orderProfit > 0 ? "green" : "red";
};
