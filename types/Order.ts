export class Order {
  public "@id"?: string;

  constructor(
    _id?: string,
    public product?: string,
    public amountBought?: number,
    public buyingPrice?: number,
    public currentWorth?: number,
    public totalPrice?: number,
    public fee?: number,
    public exchange?: string,
    public type?: string,
    public createdDate?: Date,
    public updatedDate?: Date
  ) {
    this["@id"] = _id;
  }
}
