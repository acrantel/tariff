import { Product } from "../types";

export const getSuggestedProducts = async (keyword: string): Promise<Product[]> => {
  return [
    {
      link: `https://www.walmart.com/laksdjf/`,
      name: "Name Of Productasdfaljsdf laksdjflkj as dlfsadfa sdfaskj lasjdkf lkajsd f",
      price: 100,
    },
    {
      link: "https://www.amazon.com/askdf/asdjlf/",
      name: "Name of Product 2 lasdjf alskdjfsl akdjflsaj kdfljkasdf ",
      price: 200,
    },
  ];
};
