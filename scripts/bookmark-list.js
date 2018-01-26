'use strict';
/* global store store, api, $ */

const bookmarks = (function(){

  const starMaker = function(num) {
    const star = '<i class="fa fa-star" aria-hidden="true"></i>';
    let str = '';
    for (let i = 0; i < num; i++) {
      str += star;
    }
    return str;
  };

  const generateBookmarkElement = function(bookmark) {
    let displayVisible = `
      <p>${bookmark.desc}</p>
      <a href="${bookmark.url}" target="blank">Visit Site</a>
      <button class="delete">Delete</button>
      `;
      
    return `
      <li data-id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
       <span>${starMaker(bookmark.rating)}</span> 
       ${bookmark.hidden ? displayVisible : '' }
     </li>`;
  };

  const inputString = `
  <form action="#" id="js-bookmark-form">
      <label>Title</label>
      <input type="text" id="title" placeholder="add a title" class="js-title" maxlength="30">
      <label>Link</label>
      <input type="text" id="url" class="js-url" placeholder="Type in URL" type="url">
      <label>Description</label>
      <input type="text" id="desc" class="js-desc" placeholder="Add description" maxlength="140">
        <input class:"radio-rating" type="radio" name="rating" data-radio-rating=1 value="1"> 1
        <input class:"radio-rating" type="radio" name="rating" data-radio-rating=2 value="2"> 2
        <input class:"radio-rating" type="radio" name="rating" data-radio-rating=3 value="3"> 3
        <input class:"radio-rating" type="radio" name="rating" data-radio-rating=4 value="4"> 4
        <input class:"radio-rating" type="radio" name="rating" data-radio-rating=5 value="5"> 5
      <button>Submit</button>
    </form>
  `;

  const generateBookmarkString = function(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  };

  const render = function () {
    let bookmarks = store.state.list;
    // Filter bookmarks list if store.state prop `filter` is not empty
    if (store.state.filter) {
      bookmarks = store.state.list.filter(bookmark => bookmark.rating > store.state.filter);
    }
    const shoppingListItemsString = generateBookmarkString(bookmarks);
    // insert that HTML into the DOM
    $('.js-bookmarks').html(shoppingListItemsString);
  };

  const bookmarkInput = function () {
    $('.add').click(function (event) {
      let input = $('.input').html();
      if(!input) {
        $('.input').html(inputString);
      } else {
        $('.input').html('');
      }
      $('.rating, .js-refresh').toggleClass('hidden');
    });
  };

  const handleNewItemSubmit = function() {
    $('.input').on('submit', '#js-bookmark-form', function (event) {
      event.preventDefault();
      const bookmark = {
        title: $('.js-title').val(),
        rating: $('input[name=rating]:checked').data('radio-rating'),
        desc: $('.js-desc').val(),
        url: $('.js-url').val()
      };
      $('.js-bookmark-entry').val('');
      api.createBookmark(bookmark, () => {
        store.addBookmark(bookmark);
        api.getBookmarks(data => {
          store.state.list = data;
          render();
          $('.rating, .js-refresh').toggleClass('hidden');
          $('.input').html('');
        });
      });
    });
  };

  const handleItemDelete = function () {
    $('ul').on('click', '.delete', event => {
      const id = $(event.currentTarget).closest('li').data('id');
      api.deleteBookmark(id, data => {
        api.getBookmarks(data => {
          store.state.list = data;
          render();
        });
      });
    });
  };  
  
  const fullDisplay = function () {
    $('ul').on('click', 'li', event => {
      // $(event.currentTarget).children('p, a, .delete').toggleClass('hidden');
      const id = $(event.currentTarget).data('id');
      console.log(id);
      store.findById(id);
      console.log(store.state.list);
      render();
      //   store.state.list = store.state.list.filter(val => val.rating >= rating)
    });
  };

  const filter = function () {
    $('.filter').click(event => {
      event.preventDefault();
      const rating = $('.ratings option:selected').data('rating');
      api.getBookmarks(data => {
        store.state.list = data.filter(val => val.rating >= rating);
        render();
      });
    });
  };

  const refresh = function () {
    $('.js-refresh').click(function() {
      api.getBookmarks(data => {
        store.state.list = data;
        render();
      });
    });
  };
  function bindEventListeners() {
    render(),
    bookmarkInput(),
    handleNewItemSubmit(),
    handleItemDelete(),
    fullDisplay(),
    filter();
    refresh();
  }
  return {
    render,
    bindEventListeners,
  };
}());