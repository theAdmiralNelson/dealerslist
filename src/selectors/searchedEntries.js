import { createSelector } from 'reselect';
import _ from 'lodash';

const entriesSelector = state => state.employees;
const searchSelector = state => state.searching.search;

const getEntries = (employees, search) => {

  const mappedEntries = _.map(employees, (val, uid) => {
    return { ...val, uid };
  });

  const searchLowerCase = search.toLowerCase();

  const searchedEntries = _.filter(mappedEntries,
    (value) => (value.make.toLowerCase().indexOf(searchLowerCase) !== -1 ||
      value.model.toLowerCase().indexOf(searchLowerCase) !== -1)
        && value.sold === false);

  console.log(mappedEntries);
  console.log(searchedEntries);

  return searchedEntries;
  };

export default createSelector(
  entriesSelector,
  searchSelector,
  getEntries
);
