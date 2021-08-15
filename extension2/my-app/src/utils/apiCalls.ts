import { Product } from "../types";

export const getSuggestedProducts = async (keyword: string): Promise<Product[]> => {
  return [
    {
      link: `http.com${Date.now()}`,
      name: "Name Of Productasdfaljsdf laksdjflkj as dlfsadfa sdfaskj lasjdkf lkajsd f",
      price: 100,
    },
    {
      link: "https://www.bing.com",
      name: "Name of Product 2 lasdjf alskdjfsl akdjflsaj kdfljkasdf ",
      price: 200,
    },
  ];
};
