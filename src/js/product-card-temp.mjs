// Generate HTML for a product card
export function productCardTemplate(media) {

  return `<li class="product-card">
    <a href="/media_page/?type=${media.mediaType}&id=${media.id}">
      <img src="${media.posterFull}" alt="Image of ${media.originalTitle}">
      <h3 class="card__name">${media.title}</h3>
      ${media.userRating ? `
        <div class="rating">
          ${"⭐".repeat(media.userRating)}
        </div>
      `:  ""} 
    </a>
  </li>`;
}
