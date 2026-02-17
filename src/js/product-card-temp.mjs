// Generate HTML for a product card
export function productCardTemplate(product) {

  return `<li class="product-card">
    <a href="media_page/?id=${product.id}&type=movie">
      <img src="${product.poster_full}" alt="Image of ${product.original_title}">
      <h3 class="card__name">${product.title}</h3>
    </a>
  </li>`;
}
