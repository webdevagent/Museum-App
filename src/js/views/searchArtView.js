import { domElements } from '../base'

export const getInput = () => {
  return {
    search: domElements.search.value,
    option: domElements.option.value
  }
}
export const clearInput = () => {
  domElements.search.value = '';
};
export const clearResults = () => {
  domElements.artsContainer.innerHTML = '';
};


const renderArt = art => {
  const markup = `
    <div class="flip-box" data-id='${art.objectNumber}'>
          <img src='${art.headerImage.url}'>
          <p class="name">${art.longTitle}</p>
    </div>
    `;
  domElements.artsContainer.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (arts) => {
  arts.forEach(renderArt);
};
