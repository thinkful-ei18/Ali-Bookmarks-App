'use strict';
/* global store store, api, $ */

const bookmarks = (function(){

  const generateBookmarkElement = function(bookmark) {
    let displayVisible = `
      <p class="hidden">${bookmark.desc}</p>
      <a class="hidden" href="${bookmark.url}" target="blank">Visit Site</a>
    `;
    return `
      <li data-id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
       <span>${bookmark.rating}</span> 
       ${!bookmark.hidden ? displayVisible : '' }
       <button class="delete">Delete</button>
     </li>
    `;
  };

  const inputString = `
  
  <form action="#" id="js-bookmark-form">
      <label>Title</label>
      <input type="text" id="title" placeholder="add a title" class="js-title">
      <label>Link</label>
      <input type="text" id="url" class="js-url" placeholder="Type in URL">
      <label>Description</label>
      <input type="text" id="desc" class="js-desc" placeholder="Add description">
      
        <input type="radio" name="rating" value="1"> 1
        <input type="radio" name="rating" value="2"> 2
        <input type="radio" name="rating" value="3"> 3
        <input type="radio" name="rating" value="4"> 4
        <input type="radio" name="rating" value="5"> 5
      
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
        rating: $('.rating').val(),
        desc: $('.js-desc').val(),
        url: $('.js-url').val()
      };
      console.log(bookmark);
      $('.js-bookmark-entry').val('');
      api.createBookmark(bookmark, () => {
        store.addBookmark(bookmark);
        api.getBookmarks(data => {
          store.state.list = data;
          render();
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
      console.log('click');
      $(event.currentTarget).children('p, a').toggleClass('hidden');
    });
  };

  return {
    render,
    bookmarkInput,
    handleNewItemSubmit,
    handleItemDelete,
    fullDisplay
  };
}());