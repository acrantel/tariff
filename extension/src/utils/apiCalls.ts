import { Product } from "../types";
import axios from "axios";

export const getSuggestedProducts = async (
  keyword: string,
  callBackend = true,
): Promise<Product[]> => {
  if (callBackend) {
    try {
      console.log("calling 4000 api");
      const productList = (
        await axios.get<{ product_list: Product[] }>(`http://localhost:4000/?keyword=${keyword}`)
      ).data.product_list;
      console.log(productList);
      return productList;
    } catch (error) {
      console.error(error);
    }
  }
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
