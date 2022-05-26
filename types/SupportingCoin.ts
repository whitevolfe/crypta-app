export class SupportingCoin {
    public "@id"?: string;
  
    constructor(
      _id?: string,
      public symbol?: string,
      public name?: string,
      public image?: string,
      public coinId?: string
    ) {
      this["@id"] = _id;
    }
  }
  