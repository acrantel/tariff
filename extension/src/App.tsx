import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import logo from "./logo.svg";
import { ChromeMessage, Product, Sender } from "./types";
import { getSuggestedProducts } from "./utils/apiCalls";
import "./App.css";
import { getKeywordMessage, updateReactFromBackground } from "./utils/constants";
import { IconContext } from "react-icons";
import ProductCard from "./components/ProductCard";

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
    setProductList(await getSuggestedProducts(keyword, false));
  };

  // set up listening to port of background script
  useEffect(() => {
    console.log("in effect");
    chrome.runtime.onMessage.addListener((msg: ChromeMessage, sender, response) => {
      console.log("in app.tsx but the ohter listener", msg);
      updateProductList(msg.message);
    });
  }, []);
  // get initial keyword
  useEffect(() => {
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    const requestKeywordMessage = {
      from: Sender.React,
      message: getKeywordMessage,
    } as ChromeMessage;
    // call content script to get keyword
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        /**
         * Sends a single message to the react in the specified tab,
         * with an optional callback to run when a response is sent back.
         */
        chrome.tabs.sendMessage(currentTabId, requestKeywordMessage, (response: ChromeMessage) => {
          if (response) {
            updateProductList(response.message);
          }
        });
      });
  }, []);

  const priceList = productList?.map((product) => product.price);
  const highestPrice = priceList && Math.max(...priceList);
  const calculateBadgeColor = (price: number): string => {
    if (price * 1.2 > highestPrice) {
      return "#f48fb1"; // light pink for high prices
    } else {
      return "#fce4ec"; // dark pink for low prices
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logo">Tariff</div>
        <div
          className="close-popup-button-wrapper"
          onClick={() => {
            window.close();
          }}
        >
          <IconContext.Provider value={{ color: "#c0c0c0", size: "20px" }}>
            <div>
              <CgClose />
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className="product-found">
        <img src={"./heart_thing_2.svg"} className="mascot-happy" alt="product found" />
        <div className="title-under-mascot">Products found!</div>
      </div>
      <hr />
      <div className="product-list">
        {productList?.map((product) => (
          <ProductCard
            link={product.link}
            name={product.name}
            price={product.price}
            badgeColor={calculateBadgeColor(product.price)}
          />
        ))}
      </div>
      <div className="footer">
        <hr />
        <span className="footer-text">
          Why did we make this extension? Click here to read about the{" "}
          <a href="https://en.wikipedia.org/wiki/Pink_tax" style={{ color: "deeppink" }}>
            Pink Tax
          </a>
        </span>
      </div>
    </div>
  );
};

export default App;
