export const getWebsiteNameFromLink = (link: string): string => {
  try {
    return new URL(link).hostname.split(".")[1];
  } catch (error) {
    return "";
  }
};
