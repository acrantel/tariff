
export const getSuggestedProducts = (keyword: string): {link: string, name: string, price: string}[] => {
  return [{link: 'https://google.com',name:  'Name Of Product', price: '$100'},
          {link: 'https://bing.com', name: 'Name of Product 2', price: '$200'}]
}