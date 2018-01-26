'use strict';

const store = (function () {

  const state = {
    list: [],
    adding: false,
    filter: null,
  };

  //Create a function which adds key hidden set to false to every array object
  const addHidden = (obj) => {
    obj.hidden = false;
    return obj;
  };
  
  const addBookmark = function (bookmark) {
    return this.state.list.push(bookmark);
  };

  const findById = function (id) {
    return this.state.list.find(item => item.id === id).hidden = !(this.state.list.find(item => item.id === id).hidden);
  };

  const findAndUpdate = function (id, newData) {
    Object.assign(this.findById(id), newData);
  };

  const findAndDelete = function (id) {
    this.state.list = this.state.list.filter(item => item.id !== id);
  };

  const addingCheck = function () {
    this.state.adding = !this.state.adding;
  };

  const setFilter = function (term) {
    this.state.filter = term;
  };

  return {
    state,
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    addingCheck,
    setFilter,
    addHidden,
  };
}());