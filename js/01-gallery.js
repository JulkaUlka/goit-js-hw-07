import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
  galeryListElem: document.querySelector('.gallery'),
};

const photosMarkup = createPhotoMarkup(galleryItems);

refs.galeryListElem.insertAdjacentHTML('beforeend', photosMarkup);
refs.galeryListElem.addEventListener('click', onPhotosContainerClick);

function createPhotoMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="large-image.jpg"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

function onPhotosContainerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  const linkElem = event.target.closest('a');
  const photoSrc = linkElem.href;

  openModal(photoSrc);
}

function openModal(photoSrc) {
  const instance = basicLightbox.create(`
    <img src="${photoSrc}" width="800" height="600">
`);

  instance.show();
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape') instance.close();
  });
}
