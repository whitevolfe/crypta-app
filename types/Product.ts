export class Product {
  public "@id"?: string;

  constructor(
    _id?: string,
    public tradingPair?: string,
    public coinId?: string,
    public amountBought?: number,
    public buyingPrice?: number,
    public exchangeFee?: number,
    public priceChange?: number,
    public priceChangePercentage?: number,
    public createdDate?: Date,
    public updatedDate?: Date,
    public orders?: any,
    public dailyTips?: any,
    public coinDetails?: any
  ) {
    this["@id"] = _id;
  }
}