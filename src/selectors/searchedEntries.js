import { createSelector } from 'reselect';
import _ from 'lodash';

const entriesSelector = state => state.employees;
const searchSelector = state => state.searching.search;

const getEntries = (employees, search) => {
  const searchedEntries = _.filter(employees,
    (value) => (value.make.indexOf(search) !== -1 ||
    value.model.indexOf(search) !== -1)
   && value.sold === false);
console.log(searchedEntries);

  return searchedEntries;
};

export default createSelector(
  entriesSelector,
  searchSelector,
  getEntries
);
