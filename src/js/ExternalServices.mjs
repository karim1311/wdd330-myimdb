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
      posterFull: item.poster_path  
      ?  `${imageBaseURL}${item.poster_path}` 
      : "/images/missing-image.svg",
      release_date: item.release_date || item.first_air_date,
      mediaType: mediaType,
    }));
  }

  async getMediaDetails(id, mediaType = "movie") {
    const data = await this.request(`/${mediaType}/${id}?language=en-US`);

    return {
      ...data,
      posterFull: `${imageBaseURL}${data.poster_path}`,
      title: data.title || data.name,
    };

  }

  async searchMedia(term) {
    const data = await this.request(`/search/multi?query=${term}&language=en-US`);

    const filteredResults = data.results
    .filter(item => item.media_type !== "person")
    .map(item =>  ({
      ...item,
      mediaType: item.media_type,
      posterFull: item.poster_path ? `${imageBaseURL}${item.poster_path}` : null,
      title: item.title || item.name,
      originalTitle: item.original_title || item.original_name,
    }))

    return filteredResults

  }


}
