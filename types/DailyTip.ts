export class DailyTip {
  public "@id"?: string;

  constructor(
    _id?: string,
    public content?: string,
    public product?: string,
    public createdDate?: Date,
    public updatedDate?: Date
  ) {
    this["@id"] = _id;
  }
}
