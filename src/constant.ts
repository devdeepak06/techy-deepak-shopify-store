// constant.js
export function config() {
  const api_access_token = import.meta.env.VITE_API_ACCESS_TOKEN;
  const api_key = import.meta.env.VITE_API_KEY;
  const shop_url = import.meta.env.VITE_BASE_URL;
  const storefrontAccessToken = import.meta.env
    .VITE_STOREFRONT_API_ACCESS_TOKEN;
  return {
    api_access_token,
    api_key,
    shop_url,
    storefrontAccessToken,
  };
}
