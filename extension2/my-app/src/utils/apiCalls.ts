import { Product } from "../types";

export const getSuggestedProducts = async (keyword: string): Promise<Product[]> => {
  return [
    { link: `http.com${Date.now()}`, name: "Name Of Product", price: 100 },
    { link: "https://bing.com", name: "Name of Product 2", price: 200 },
  ];
};
