import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";

// Load header and footer, then update cart counter
loadHeaderFooter()

// Create product data instance for tents
const externalServices = new ExternalServices();

// Fetch and render movies
externalServices.getMediaList("movie", "popular").then((products) => {
  // Take first 4 products from tents for Top Products
  const topProducts = products.slice(0, 4);
  renderListWithTemplate(
    productCardTemplate,
    document.querySelector(".product-list"),
    topProducts,
    "beforeend",
    true,
  );
});

// Fetch and render tvshows
externalServices.getMediaList("tv", "popular").then((products) => {
  // Take first 4 products from tents for Top Products
  const topProducts = products.slice(0, 4);
  renderListWithTemplate(
    productCardTemplate,
    document.querySelector(".tv-list"),
    topProducts,
    "beforeend",
    true,
  );
});

