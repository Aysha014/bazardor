
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};


export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

export type ProductDetail = Product & {
  slug: string;
  category: string;
  yesterday: number;
  summary?: string;
  markets: MarketPrice[];
};