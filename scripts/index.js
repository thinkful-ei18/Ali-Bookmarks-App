'use strict';
/* global store, api, bookmarks */
bookmarks.bookmarkInput();
bookmarks.handleNewItemSubmit();
bookmarks.handleItemDelete();
api.getBookmarks(data => {
  store.state.list = data;
  bookmarks.render();
});