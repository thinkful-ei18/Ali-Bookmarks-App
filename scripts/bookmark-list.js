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

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

 

  return {

  };
}());