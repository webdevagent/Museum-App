import {  domElements } from '../base'

export const renderArt = art => {
  const markup = `
  <div class="modal">
    <div class="card" data-id=${art.objectNumber}>
      <img src="${art.webImage.url}" alt="${art.title}">
      <h1 class="title">${art.longTitle}</h1>
      <p class="painter_name">${art.principalMaker}</p>
      <p class="like">Like</p>
      <p><button class="more_info">More Info</button></p>
      <span class="close">&times;</span>
      <div class="detals_page">
        <p><span>Descriptions: </span>${art.description}</p>
        <p><span>Materials: </span>${art.materials}</p>
      </div>
   </div>
  </div>

    `;
  console.log(domElements.modalContainer);
  domElements.modalContainer.insertAdjacentHTML('beforeend', markup);
};
