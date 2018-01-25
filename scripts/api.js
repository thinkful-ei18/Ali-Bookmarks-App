'use strict';

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ali/';

  const getItems = function (callback) {
    $.getJSON(`${BASE_URL}bookmarks`, callback);
  };

  const createItem = function (title, url, desc, rating, callback) {
    const newItem = {
      title: title,
      url: url,
      desc: desc,
      rating: rating,
    };

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newItem),
      success: callback,
    });
  };



  return {
    getItems,
    createItem,
  };
}());