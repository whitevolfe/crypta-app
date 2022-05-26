import { orderProfit, orderProfitPercent, orderProfitPercentFormatted, lableColor } from "./Function";

test("orderProfit01", () => {
  const order = {
    "@id": "1",
    amount: "1",
    price: "1",
  };
  const currentPrice = 1;
  expect(orderProfit(order, currentPrice)).toBe(0);
});

test("orderProfit01", () => {
  const order = {
    "@id": "2",
    amount: "100",
    price: "201",
  };
  const currentPrice = 220;
  expect(orderProfit(order, currentPrice)).toBe(-1900);
});

//test color
test("test order label color", () => {
  expect(lableColor(12)).toBe("green");
});

test("test order label color for minus value", () => {
  expect(lableColor(-12)).toBe("red");
});

