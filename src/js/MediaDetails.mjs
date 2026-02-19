import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class MediaDetails {

  constructor(id, type, dataSource) {
    this.id = id
    this.type = type;
    this.media = {}
    this.dataSource = dataSource;
  }

  async init() {

    const mainTag = document.querySelector("main");

    this.media = await this.dataSource.getMediaDetails(
      this.id,
      this.type
    );

    const template = document.getElementById("media-template");

    this.renderDetails(mainTag, this.media, template);

  }

  renderDetails(node, media, template) {
    const clone = template.content.cloneNode(true);
    const [title, image, desc, ] = clone.querySelectorAll("h3, img, p")

    title.textContent = media.title;
    image.src = media.posterFull || "/images/missing-image.svg";
    image.alt = `Image of ${media.title}`;
    desc.innerHTML = media.overview;

    node.appendChild(clone);
  }
}
