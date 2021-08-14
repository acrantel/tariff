import React, { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import logo from "./logo.svg";
import { ChromeMessage, Product, Sender } from "./types";
import { getSuggestedProducts } from "./utils/apiCalls";

import "./App.css";
import { updateReactFromBackground } from "./utils/constants";

const App = () => {
  const [url, setUrl] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>();

  // updates keyword and product list
  const updateProductList = async (newKeyword: string) => {
    console.log("in app.tsx, setting keyword");
    if (newKeyword !== keyword) {
      setKeyword(newKeyword);
    }
    setProductList(await getSuggestedProducts(keyword));
  };

  // set up listening to port of background script
  useEffect(() => {
    console.log("in effect");
    chrome.runtime.onMessage.addListener((msg: ChromeMessage, sender, response) => {
      console.log("in app.tsx but the ohter listener", msg);
      updateProductList(msg.message);
    });
  }, []);

  console.log("test");

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <GrFormClose color={"#e0e0e0"} />
      </div>
      <div className="product-found">
        <img src={"./logo192.png"} alt="product found" />
      </div>
      <p>Alternate Products</p>
      {productList?.map((product) => (
        <p>{product.link}</p>
      ))}
      <p>link to other thing</p>
      <p>
        keyword: {keyword} {Date.now()}
      </p>
    </div>
  );
};

export default App;
