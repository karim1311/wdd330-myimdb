const baseURL = 'https://api.themoviedb.org/3'
const imageBaseURL = 'https://image.tmdb.org/t/p/w500'

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
  }


  options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  }}

  async request(endpoint) {
    const res = await fetch(`${baseURL}${endpoint}`, this.options);
    return convertToJson(res);
  }

  async getMediaList(mediaType = "movie", category = "popular", page = 1) {
    const data = await this.request(
      `/${mediaType}/${category}?language=en-US&page=${page}`
    );

    return data.results.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      poster_full: item.poster_path  
      ?  `${imageBaseURL}${item.poster_path}` 
      : "/images/missing-image.svg",
      release_date: item.release_date || item.first_air_date,
      mediaType: mediaType,
    }));
  }

  async getMediaDetails(id) {
    const data = await this.request(`/movie/${id}?language=en-US`);

    return {
      ...data,
      poster_full: `${imageBaseURL}${data.poster_path}`,
    };

  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.id === id);
  }
}
