import { ChromeMessage, Sender } from "../types";
import { exampleKeywords, getKeywordMessage } from "../utils/constants";

console.log("bich");

const findKeywordInPage = (): string => {
  const htmlString = document.documentElement.innerHTML.toLowerCase();
  // pick the keyword that appears the most on the page as the keyword we return
  let maxCount = 0;
  let maxKeyword = "no keyword found";
  for (const keyword of exampleKeywords) {
    const curCount = htmlString.split(keyword).length;
    if (curCount > maxCount) {
      maxCount = curCount;
      maxKeyword = keyword;
    }
  }
  return maxKeyword;
};

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, response) => {
  console.log("listener in content page called to find keyword", findKeywordInPage());
  if (message.message === getKeywordMessage) {
    response({ from: Sender.Content, message: findKeywordInPage() });
  }
  response("listener in content page got invalid message");
});
