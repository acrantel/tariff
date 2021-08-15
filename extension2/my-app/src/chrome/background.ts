import { ChromeMessage, Sender } from "../types";
import { getKeywordMessage, updateReactFromBackground } from "../utils/constants";

const queryInfo: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};
const requestKeywordMessage = {
  from: Sender.Background,
  message: getKeywordMessage,
} as ChromeMessage;

const updater = () => {
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
          console.log("sending new keyword: ", response);
          chrome.runtime.sendMessage({
            from: Sender.Background,
            message: response.message,
          });
        }
      });
    });
  setTimeout(updater, 500);
};
updater();

//todo figure out how to send messages back and forth consistenly and update the ui aaa
