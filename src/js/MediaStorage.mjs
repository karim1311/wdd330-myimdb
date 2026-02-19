import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class MediaStorage {

  constructor(storageKey = "userMedia") {
    this.storageKey = storageKey;
  }

  // Obtener todo el arreglo
  getUserMedia() {
    return getLocalStorage(this.storageKey) || [];
  }

  // Guardar arreglo completo
  saveUserMedia(mediaArray) {
    setLocalStorage(this.storageKey, mediaArray);
  }

  // Agregar o actualizar una media
  updateUserMedia(media) {
    const userMedia = this.getUserMedia();

    const index = userMedia.findIndex(
      item => item.id === media.id && item.mediaType === media.mediaType
    );

    if (index !== -1) {
      userMedia[index] = media;
    } else {
      userMedia.push(media);
    }

    this.saveUserMedia(userMedia);
  }

  removeUserMedia(id,type) {
    const mediaList = this.getUserMedia();

    const updatedList = mediaList.filter(
      media => !(media.id === id && media.mediaType === type)
    )

    setLocalStorage("userMedia", updatedList)
  }

  // Obtener una media específica
  getMediaById(id, mediaType) {
    const userMedia = this.getUserMedia();
    return userMedia.find(
      item => item.id === id && item.mediaType === mediaType
    );
  }

}
