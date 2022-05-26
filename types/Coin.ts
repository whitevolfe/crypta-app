export class Coin {
    public "@id"?: string;
  
    constructor(
      _id?: string,
      public coinId?: string,
      public symbol?: string,
      public name?: string,
      public image?: string,
      public currentPrice?: number,
      public marketCap?: string,
      public marketCapRank?: string,
      public totalVolume?: string,
      public high24h?: number,
      public low24h?: number,
      public priceChange24h?: number,
      public priceChangePercentage24h?: number,
      public lastUpdated?: Date
    ) {
      this["@id"] = _id;
    }
  }
  