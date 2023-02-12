import { galleryItems } from "./gallery-items.js";

const divList = document.querySelector(".gallery");

// перемінна фукції додавання розмітки
const cardMarkup = createImageCardMarkup(galleryItems);

divList.insertAdjacentHTML("beforeend", cardMarkup);
divList.addEventListener("click", onImageClick);

// Підключення бібліотеки модального вікна
// const sсript = document.querySelector("sсript");
// sсript.src =
//   "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js";
// sсript.integrity = "sha256-nMn34BfOxpKD0GwV5nZMwdS4e8SI8Ekz+G7dLeGE4XY=";
// sсript.crossorigin = "anonymous";
// document.body.appendChild(sсript);

// Функція додавання розмітки
function createImageCardMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>
    `;
    })
    .join("");
}

function onImageClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const scrOriginalImage = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${scrOriginalImage}" width='1280' htigth='auto'>`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", closeModalEsc);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", closeModalEsc);
      },
    }
  );
  instance.show();

  function closeModalEsc(evt) {
    console.log(evt.code);
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
