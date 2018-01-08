import { createSelector } from 'reselect';
import _ from 'lodash';

const entriesSelector = state => state.employees;
const searchSelector = state => state.searching.search;

const getEntries = (employees, search) => {

  const mappedEntries = _.map(employees, (val, uid) => {
    return { ...val, uid };
  });

  const searchLowerCase = search.toLowerCase();

  const sortMappedEntries = _.sortBy(mappedEntries, (value) => value.make);

  const searchedEntries = _.filter(sortMappedEntries,
    (value) => (value.make.toLowerCase().indexOf(searchLowerCase) !== -1 ||
    value.model.toLowerCase().indexOf(searchLowerCase) !== -1)
    && value.sold === false);

    return searchedEntries;
};

export default createSelector(
  entriesSelector,
  searchSelector,
  getEntries
);
