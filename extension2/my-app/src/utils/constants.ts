import { ChromeMessage, Sender } from "../types";

export const exampleKeywords = [
  "razor",
  "toy",
  "doll",
  "deodorant",
  "shampoo",
  "conditioner",
  "body wash",
  "lotion",
];

// used by background & react to get the keyword from content
export const getKeywordMessage = "get_keyword";
// used by background script to tell react frontend to update keyword
export const updateReactFromBackground = "update_react_from_background";
