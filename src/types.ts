export type Lang = "en" | "gr";

export interface PortfolioItem {
  src: string;
  full?: string;
  category?: string;
  alt?: string;
}

export interface Site {
  title: string;
  description?: string;
  screenshot: string;
  url: string;
}

export interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  approved?: boolean;
}
