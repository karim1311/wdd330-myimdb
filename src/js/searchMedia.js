import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";

await loadHeaderFooter()

const searchTerm = getParam("search");
const resultsContainer = document.querySelector(".search-results");
const heading = document.querySelector(".search-heading");

if (!searchTerm) {
  resultsContainer.innerHTML =
    "<p class='no-results'>Search for a movie or TV show above.</p>";
} else {
  initSearch(searchTerm.trim());
}

async function initSearch(term) {
  const externalServices = new ExternalServices();

  try {
    const data = await externalServices.searchMedia(term);

    // When there is no results
    if (!data.length) {
      resultsContainer.innerHTML = `
        <p class="no-results">
          No results found for "<strong>${term}</strong>".
        </p>
      `;
      return;
    }

    // Update heading with search term
    if (heading) {
      heading.textContent = `Search results for "${term}"`;
    }

    // Render Results
    renderListWithTemplate(
      productCardTemplate,
      resultsContainer,
      data,
      "beforeend",
      true
    );
  } catch (error) {
    console.error("Search failed:", error);
    resultsContainer.innerHTML =
      "<p class='no-results'>There was a problem loading search results. Please try again.</p>";
  }
}