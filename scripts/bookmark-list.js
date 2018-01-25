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

  return {
    render,
  };
}());