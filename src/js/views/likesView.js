import { domElements } from '../base'

const renderLike = like => {
  const markup = `
    <div class="like-box" data-id='${like}'>
          <p>${like}</p>
    </div>
    `;
  domElements.artsContainer.insertAdjacentHTML('beforeend', markup);
};

export const renderLikes = (likes) => {
  likes.forEach(renderLike);
};
