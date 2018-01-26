'use strict';
/* global store, api, bookmarks */
$(document).ready(function () {
  bookmarks.bindEventListeners(),
  //initial get items
  api.getBookmarks(data => {
    store.state.list = data.map(val => store.addHidden(val));
    bookmarks.render();
    console.log(store.state.list);
  });
});
