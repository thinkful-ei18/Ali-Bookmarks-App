'use strict';
/* global store, api, bookmarks */
$(document).ready(function () {
  bookmarks.bindEventListeners(),
  //initial get items
  api.getBookmarks(data => {
    store.state.list = data;
    bookmarks.render();
  });
});
