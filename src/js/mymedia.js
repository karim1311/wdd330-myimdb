import { renderListWithTemplate, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";
import MediaStorage from "./MediaStorage.mjs"

// Load header and footer, then update cart counter
loadHeaderFooter()

// Create product data instance for tents
const externalServices = new ExternalServices();

const storage = new MediaStorage();

async function loadMovies(){
  const userMovies = storage.getUserMedia().filter(m => m.mediaType === "movie")

  const promises = userMovies.map(movie => 
    externalServices.getMediaDetails(movie.id, "movie")
      .then(details =>  ({
        ...details,
        mediaType: "movie",
        userRating: movie.rating
      }))
  )

  const detailedMovies = await Promise.all(promises)

  // Fetch and render movies
  renderListWithTemplate(
      productCardTemplate,
      document.querySelector(".movie-list"),
      detailedMovies,
      "beforeend",
      true,
  );
}

async function loadTvShows(){
  const userTvShows = storage.getUserMedia().filter(m => m.mediaType === "tv")


  const promises = userTvShows.map(tv => 
    externalServices.getMediaDetails(tv.id, "tv")
      .then(details =>  ({
        ...details,
        mediaType: "tv",
        userRating: tv.rating
      }))
  )

  const detailedTv = await Promise.all(promises)

  // Fetch and render tv
  renderListWithTemplate(
      productCardTemplate,
      document.querySelector(".tv-list"),
      detailedTv,
      "beforeend",
      true,
  );
}

loadMovies()

loadTvShows()


// Fetch and render tvshows
// externalServices.getMediaList("tv", "popular").then((products) => {
//   const topProducts = products;
//   renderListWithTemplate(
//     productCardTemplate,
//     document.querySelector(".tv-list"),
//     topProducts,
//     "beforeend",
//     true,
//   );
// });

