import { getInput,renderResults,clearInput,clearResults } from './views/searchArtView';
import { renderArt}  from './views/artCardView';
import { renderLikes } from './views/likesView';
import SearchArt from './models/SearchArt';
import ArtCard from './models/artCard';
import { domElements } from './base';


const state = {};
state.likesList = [];

const controlSearch = async () => {

  const query = getInput();
  state.query = query;
  state.page = 1;
  state.artsOnPage = 10;


  if (query.search) {
    state.search = new SearchArt(query);
    clearInput();
    clearResults();


    try {


      await state.search.getResults();
      state.artQuantity = state.search.count;

      renderResults(state.search.result);
      if (state.search.result.length == 0) alert("No art object could be found by your query");

    } catch (err) {
      console.log(err);
    }
  }
}

const newPagerender = async (pageNumber, artsPerPage) => {
  state.search = new SearchArt(state.query, pageNumber, artsPerPage);
  clearResults();
  try {
    await state.search.getResults();
    renderResults(state.search.result);



  } catch (err) {
    console.log(err);
  }
}

domElements.form.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


domElements.navMenu.addEventListener('click', ({
  target
}) => {

  if (target.className == 'next' && state.page < (Math.ceil(state.artQuantity / state.artsOnPage))) {
    state.page += 1;
    newPagerender(state.page, state.artsOnPage);

  }
  if (target.className == 'prev' && state.page > 1) {
    state.page -= 1;
    newPagerender(state.page, state.artsOnPage);
  }
  if (target.className == 'art_per_page') {
    if (target.textContent == '10' && state.artsOnPage == 50) {
      state.page = ((state.page * 50 - 50) + 10) / 10;
    } else {
      state.page = Math.ceil((state.page * (Math.ceil(state.artQuantity / +target.textContent))) / Math.ceil(state.artQuantity / state.artsOnPage));
    }
    state.artsOnPage = +target.textContent;

    newPagerender(state.page, state.artsOnPage);
  }
  if (target.className == 'liked') {
    clearResults();
    renderLikes(state.likesList);
  }
});


domElements.artsContainer.addEventListener('click', async ({
  target
}) => {
  let container = target.closest('.flip-box');
  if (container) {
    state.modalCard = new ArtCard(container.dataset.id);

    try {
      await state.modalCard.getResults();
      renderArt(state.modalCard.result);
    } catch (error) {
      console.log(error);
    }
  }
  if (target.className == 'like-box') {
    state.query.search = target.dataset.id;
    state.artQuantity = 1;
    newPagerender(1, 10);
    domElements.modalContainer.innerHTML = '';
  }
});
domElements.modalContainer.addEventListener('click', ({
  target
}) => {
  if (target.className == 'close') domElements.modalContainer.innerHTML = '';
  if (target.className == 'more_info') {
    document.querySelector('.more_info').classList.add('remove-info');
    document.querySelector('.detals_page').classList.add('show_content');
    document.querySelector('.card').classList.add('full_page');
  }
  if (target.className == 'painter_name') {
    state.query.search = target.textContent;
    newPagerender(state.page, state.artsOnPage);
    domElements.modalContainer.innerHTML = '';
  }
  if (target.className == 'like') {
    if (state.likesList.indexOf(document.querySelector('.card').dataset.id) < 0) {
      state.likesList.push(document.querySelector('.card').dataset.id);
      document.querySelector('.like').classList.add('remove-info');
    } else {
      document.querySelector('.like').textContent = 'Already liked';
      setTimeout(() => document.querySelector('.like').classList.add('remove-info'), 1500);
    }
  }
});
