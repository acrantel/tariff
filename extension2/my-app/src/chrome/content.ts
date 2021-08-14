import { ChromeMessage, Sender } from "../types";
import { exampleKeywords } from "../utils/constants";

const messagesFromReactAppListener = (message: ChromeMessage, sender, response) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "Hello from React"
  ) {
    response("Hello from content.js");
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "delete logo"
  ) {
    const logo = document.getElementById("hplogo");
    logo.parentElement.removeChild(logo);
  }
};

const findKeywordInPage = (): string => {
  const htmlString = document.documentElement.innerHTML;
  // pick the keyword that appears the most on the page as the keyword we return
  let maxCount = 0;
  let maxKeyword = "";
  for (const keyword in exampleKeywords) {
    const curCount = htmlString.split(keyword).length;
    if (curCount > maxCount) {
      maxCount = curCount;
      maxKeyword = keyword;
    }
  }
  return maxKeyword;
};

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, response) => {
  if (message.message === "find keyword") {
    response(findKeywordInPage());
  }
});

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
