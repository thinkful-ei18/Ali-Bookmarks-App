'use strict';
/* global store store, api */

const bookmarks = (function(){

  const generateBookmarkElement = function(bookmark) {
    let displayVisible = `
      <p>${bookmark.desc}</p>
      <a href="${bookmark.url}" target="blank">Visit Site</a>
    `;
    return `
      <li>
        <h3>${bookmark.title}</h3>
       <span>${bookmark.rating}</span> 
       ${!bookmark.hidden ? displayVisible : '' }
     </li>
    `;
  };

  const inputString = `
  
  <form action="#">
      <label>Title</label>
      <input type="text" id="title" placeholder="add a title">
      <label>Link</label>
      <input type="text" id="url" placeholder="Type in URL">
      <label>Description</label>
      <input type="text" id="desc" placeholder="Add description">
      <form action="" id="rating">
        <input type="radio" name="rating" value="1"> 1
        <input type="radio" name="rating" value="2"> 2
        <input type="radio" name="rating" value="3"> 3
        <input type="radio" name="rating" value="4"> 4
        <input type="radio" name="rating" value="5"> 5
      </form>
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
    });
  };

  return {
    render,
    bookmarkInput
  };
}());