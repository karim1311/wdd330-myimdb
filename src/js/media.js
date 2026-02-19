import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MediaDetails from "./MediaDetails.mjs";
import MediaStorage from "./MediaStorage.mjs";

loadHeaderFooter()

const id = getParam("id");
const type = getParam("type");

const dataSource = new ExternalServices();

const mediaDetails = new MediaDetails(id, type, dataSource);

const storage = new MediaStorage();

function getSelectedRating() {
const selected = document.querySelector('input[name="rating"]:checked');
return selected ? Number(selected.value) : null;
}

mediaDetails.init().then(() => {

  const watchedBtn = document.getElementById("watched");
  const savedMedia = storage.getMediaById(id, type);

  // restore watched button 
  if (savedMedia?.watched) {
    watchedBtn.classList.add("watched-active");
  }

  // restore rating
  if (savedMedia?.rating) {
    const ratingInput = document.querySelector(
      `input[name="rating"][value="${savedMedia.rating}"]`
    );
    if (ratingInput) ratingInput.checked = true;
  }

  watchedBtn.addEventListener("click", () => {
    const isActive = watchedBtn.classList.toggle("watched-active");

    if (isActive){
  
      const mediaObject = {
        id: id,
        mediaType: type,
        watched: isActive,
        rating: getSelectedRating()
      };
  
      storage.updateUserMedia(mediaObject);
    } else {

      const ratingInputs = document.querySelectorAll('input[name="rating"]');
      ratingInputs.forEach(input => input.checked = false)

      storage.removeUserMedia(id, type);
    };

  })

  const ratingInputs = document.querySelectorAll('input[name="rating"]');

  ratingInputs.forEach(input => {
    input.addEventListener("change", () => {

      const rating = getSelectedRating();

      // 🔥 Activar botón si no está activo
      if (!watchedBtn.classList.contains("watched-active")) {
        watchedBtn.classList.add("watched-active");
      }

      const mediaObject = {
        id: id,
        mediaType: type,
        watched: true,
        rating: rating
      };

      storage.updateUserMedia(mediaObject);

    });
  });


});